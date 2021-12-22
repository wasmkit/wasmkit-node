/*
MIT License

Copyright (c) 2021 Andrew T (github.com/awt-256)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { DataSegment, DataSegmentMode, ElementSegment, ElementSegmentMode, ExportEntry, ExternalType, FunctionCode, FunctionDescription, FunctionType, GlobalEntry, GlobalType, ImportEntry, Instruction, InstructionExpression, MemoryArgument, MemoryType, Opcode, Opstring, ResizableLimits, SectionId, TableType, ValueType, WasmModule } from "./const";

const convo = new ArrayBuffer(8);
const u8 = new Uint8Array(convo);
const f32 = new Float32Array(convo);
const f64 = new Float64Array(convo);
// @ts-ignore
const encoder: { encode(string: string): Uint8Array } = new TextEncoder();

class WasmWriter {
    private buffer: Uint8Array = new Uint8Array(2048);
    public size = 0;

    private expand(amount = 256) {
        const newBuffer = new Uint8Array(this.size + amount);
        newBuffer.set(this.buffer);

        this.buffer = newBuffer;
    }

    // §5.2.1
    public writeByte(byte: number) {
        if (!this.hasSpace(1)) this.expand();

        this.buffer[this.size++] = byte;
    }

    public writeSignedByte(byte: number) {
        this.writeByte((byte << 25) >>> 25);
    }

    // §5.2.2
    public writeInt32(num: number) {
        while (true) {
            let byte = num & 0x7F;
            num >>= 7;
    
            if ((num == -1 && (byte & 0x40)) || (num == 0 && !(byte & 0x40))) {
                this.writeByte(byte);
                break;
            } else {
                this.writeByte(byte | 0x80);
            }
        }
    }

    public writeUint32(num: number) {
        do {
            let byte = num & 0x7F;
            num >>>= 7;
            this.writeByte(num !== 0 ? 0x80 | byte : byte);
        } while (num)
    }

    public writeInt64(num: bigint) {
        while (true) {
            let byte = Number(num & 0x7Fn);
            num >>= 7n;
    
            if ((num == -1n && (byte & 0x40)) || (num == 0n && !(byte & 0x40))) {
                this.writeByte(byte);
                break;
            } else {
                this.writeByte(byte | 0x80);
            }
        }
    }

    // §5.2.3
    public writeFloat32(num: number) {
        f32[0] = num;
        if (!this.hasSpace(4)) this.expand();

        this.buffer.set(u8.subarray(0, 4), this.size);

        this.size += 4;
    }

    public writeFloat64(num: number) {
        f64[0] = num;
        if (!this.hasSpace(8)) this.expand();
        this.buffer.set(u8, this.size);
        this.size += 8;
    }

    // §5.2.4
    public writeName(text: string) {
        this.writeByteVector(encoder.encode(text));
    }

    public writeByteVector(bytes: Uint8Array | number[], length = bytes.length) {
        if (!this.hasSpace(bytes.length + 5)) this.expand(bytes.length + 256);

        this.writeUint32(length);
        this.buffer.set(bytes, this.size);
        this.size += bytes.length;
    }

    // §5.1.3
    public writeVector<ElementType>(elements: ElementType[], elementWriteFunc: (element: ElementType) => void, length = elements.length) {
        this.writeUint32(length);

        for (let i = 0; i < elements.length; ++i) elementWriteFunc.call(this, elements[i]);
    }

    // §5.3.5
    public writeFunctionType(functionType: FunctionType) {
        this.writeByte(0x60);

        this.writeVector(functionType.params, this.writeSignedByte);
        this.writeVector(functionType.results, this.writeSignedByte);
    }

    // §5.3.6
    public writeLimits(resizableLimits: ResizableLimits, writeFlags = true) {
        let flags = 0;
        if (typeof resizableLimits.max === "number") flags |= 1;

        if (writeFlags) this.writeByte(flags);
        this.writeUint32(resizableLimits.min);
        if (typeof resizableLimits.max === "number") this.writeUint32(resizableLimits.max);
    }

    // §5.3.7
    public writeMemoryType(memoryType: MemoryType) {
        this.writeLimits(memoryType.limits);
    }

    // §5.3.8
    public writeTableType(tableType: TableType) {
        this.writeSignedByte(tableType.referenceType);
        this.writeLimits(tableType.limits);
    }
    // §5.3.9
    public writeGlobalType(globalType: GlobalType) {
        this.writeSignedByte(globalType.valueType);

        let flags = 0;
        if (globalType.mutable) flags |= 1;

        this.writeByte(flags);
    }

    // §5.4
    public writeInstruction(instruction: Instruction) {
        if (instruction.opcode > 0xFF) {
            this.writeByte(instruction.opcode >> 8);
            this.writeUint32(instruction.opcode & 0xFF);
        } else this.writeByte(instruction.opcode);
        const immediates = instruction.immediates;
        switch (instruction.opcode) {
            case Opcode.Block:
            case Opcode.Loop:
            case Opcode.If: {
                if (typeof immediates.valueType === "number") this.writeInt32(immediates.valueType);
                else if (typeof immediates.typeIndex === "number") this.writeInt32(immediates.typeIndex);
                else throw new TypeError("Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                break;
            }
            case Opcode.Br:
            case Opcode.BrIf:
                this.assert(typeof immediates.labelIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.labelIndex as number);
                break;
            case Opcode.BrTable:
                this.assert(typeof immediates.labelIndexs !== "undefined" && typeof immediates.defaultLabelIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeVector(immediates.labelIndexs as number[], this.writeUint32);
                this.writeUint32(immediates.defaultLabelIndex as number);
                break;
            case Opcode.Call:
            case Opcode.RefFunc:
                this.assert(typeof immediates.functionIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.functionIndex as number);
                break;
            case Opcode.CallIndirect:
                this.assert(typeof immediates.typeIndex === "number" && typeof immediates.tableIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.typeIndex as number);
                this.writeUint32(immediates.tableIndex as number);
                break;
            case Opcode.RefNull:
                this.assert(typeof immediates.referenceType === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.referenceType as number);
                break;
            case Opcode.SelectWithType:
                this.assert(typeof immediates.valueTypes !== "undefined", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeVector(immediates.valueTypes as number[], this.writeUint32);
                break;
            case Opcode.LocalGet:
            case Opcode.LocalSet:
            case Opcode.LocalTee:
                this.assert(typeof immediates.localIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.localIndex as number);
                break;
            case Opcode.GlobalGet:
            case Opcode.GlobalSet:
                this.assert(typeof immediates.globalIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.globalIndex as number);
                break;
            case Opcode.TableGet:
            case Opcode.TableSet:
            case Opcode.TableGrow:
            case Opcode.TableSize:
            case Opcode.TableFill:
                this.assert(typeof immediates.tableIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.tableIndex as number);
                break;
            case Opcode.TableInit:
                this.assert(typeof immediates.elementIndex === "number" && typeof immediates.tableIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.elementIndex as number);
                this.writeUint32(immediates.tableIndex as number);
            case Opcode.TableCopy:
                this.assert(typeof immediates.fromTableIndex === "number" && typeof immediates.toTableIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");

                this.writeUint32(immediates.fromTableIndex as number);
                this.writeUint32(immediates.toTableIndex as number);
                break;
            case Opcode.ElemDrop:
                this.assert(typeof immediates.elementIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.elementIndex as number);
                break;
            case Opcode.I32Load:
            case Opcode.I64Load:
            case Opcode.F32Load:
            case Opcode.F64Load:
            case Opcode.I32Load8_S:
            case Opcode.I32Load8_U:
            case Opcode.I32Load16_S:
            case Opcode.I32Load16_U:
            case Opcode.I64Load8_S:
            case Opcode.I64Load8_U:
            case Opcode.I64Load16_S:
            case Opcode.I64Load16_U:
            case Opcode.I64Load32_S:
            case Opcode.I64Load32_U:
            case Opcode.I32Store:
            case Opcode.I64Store:
            case Opcode.F32Store:
            case Opcode.F64Store:
            case Opcode.I32Store8:
            case Opcode.I32Store16:
            case Opcode.I64Store8:
            case Opcode.I64Store16:
            case Opcode.I64Store32:
            case Opcode.V128Load:
            case Opcode.V128Load8x8_S:
            case Opcode.V128Load8x8_U:
            case Opcode.V128Load16x4_S:
            case Opcode.V128Load16x4_U:
            case Opcode.V128Load32x2_S:
            case Opcode.V128Load32x2_U:
            case Opcode.V128Load8Splat:
            case Opcode.V128Load16Splat:
            case Opcode.V128Load32Splat:
            case Opcode.V128Load64Splat:
            case Opcode.V128Load32Zero:
            case Opcode.V128Load64Zero:
            case Opcode.V128Store:
                this.assert(typeof immediates.memoryArgument !== "undefined", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");

                this.writeUint32((immediates.memoryArgument as MemoryArgument).align);
                this.writeUint32((immediates.memoryArgument as MemoryArgument).offset);
                break;
            case Opcode.V128Load8Lane:
            case Opcode.V128Load16Lane:
            case Opcode.V128Load32Lane:
            case Opcode.V128Load64Lane:
            case Opcode.V128Store8Lane:
            case Opcode.V128Store16Lane:
            case Opcode.V128Store32Lane:
            case Opcode.V128Store64Lane:
                this.assert(typeof immediates.memoryArgument !== "undefined" && typeof immediates.laneIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");

                this.writeUint32((immediates.memoryArgument as MemoryArgument).align);
                this.writeUint32((immediates.memoryArgument as MemoryArgument).offset);
                this.writeByte(immediates.laneIndex as number);
                break;
            case Opcode.MemorySize:
            case Opcode.MemoryGrow:
                // Memory Index - not in specification
                this.writeByte(0x00);
                break;
            case Opcode.MemoryInit:
                this.assert(typeof immediates.dataIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.dataIndex as number);
                // Memory Index - not in specification
                this.writeByte(0x00);
                break;
            case Opcode.DataDrop:
                this.assert(typeof immediates.dataIndex === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.dataIndex as number);
                break;
            case Opcode.MemoryCopy:
                // Memory Index - not in specification
                this.writeByte(0x00); // from
                this.writeByte(0x00); // to
                break;
            case Opcode.MemoryFill:
                // Memory Index - not in specification
                this.writeByte(0x00);
                break;
            case Opcode.I32Const:
                this.assert(typeof immediates.value === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeInt32(immediates.value as number);
                break;
            case Opcode.I64Const:
                this.assert(typeof immediates.value === "bigint", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeInt64(immediates.value as bigint);
                break;
            case Opcode.F32Const:
                this.assert(typeof immediates.value === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeFloat32(immediates.value as number);
                break;
            case Opcode.F64Const:
                this.assert(typeof immediates.value === "number", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeFloat64(immediates.value as number);
                break;
            case Opcode.V128Const:
                this.assert(typeof immediates.bytes !== "undefined", "Invalid immediates found in " + Opstring[instruction.opcode] + " instruction.");
                this.writeByteVector(immediates.bytes as Uint8Array, 16);
                break;
            default:
                this.assert(Opstring.hasOwnProperty(instruction.opcode),
                    "Unsupported instruction")
        }
    }

    // §5.4.8
    public writeInstructionExpression(expression: InstructionExpression) {
        for (let i = 0; i < expression.length; ++i) {
            this.writeInstruction(expression[i]);
        }
    }
    // §5.5.4
    public writeTypeEntry(typeEntry: FunctionType) {
        return this.writeFunctionType(typeEntry);
    }

    // §5.5.5
    public writeImportEntry(importEntry: ImportEntry) {
        this.writeName(importEntry.module);
        this.writeName(importEntry.name);
        this.writeByte(importEntry.type);

        switch (importEntry.type) {
            case ExternalType.Function:
                this.writeUint32(importEntry.description.typeIndex);
                break;
            case ExternalType.Table:
                this.writeTableType(importEntry.description);
                break;
            case ExternalType.Memory:
                this.writeMemoryType(importEntry.description);
                break;
            case ExternalType.Global:
                this.writeGlobalType(importEntry.description);
                break;
            default:
                throw new TypeError("Unsupported external type")
        }
    }

    // §5.5.6
    public writeFunctionEntry(funcDescription: FunctionDescription) {
        this.writeUint32(funcDescription.typeIndex);
    }

    // §5.5.7
    public writeTableEntry(tableType: TableType) {
        return this.writeTableType(tableType);
    }

    // §5.5.8
    public writeMemoryEntry(memoryType: MemoryType) {
        return this.writeMemoryType(memoryType);
    }

    // §5.5.9
    public writeGlobalEntry(globalEntry: GlobalEntry) {
        this.writeGlobalType(globalEntry.type);
        this.writeInstructionExpression(globalEntry.initialization);
    }

    // §5.5.10
    public writeExportEntry(exportEntry: ExportEntry) {
        this.writeName(exportEntry.name);
        this.writeByte(exportEntry.type);

        switch (exportEntry.type) {
            case ExternalType.Function:
                this.writeUint32(exportEntry.description.functionIndex);
                break;
            case ExternalType.Table:
                this.writeUint32(exportEntry.description.tableIndex);
                break;
            case ExternalType.Memory:
                this.writeUint32(exportEntry.description.memoryIndex);
                break;
            case ExternalType.Global:
                this.writeUint32(exportEntry.description.globalIndex);
                break;
            default:
                throw new TypeError("Unsupported external type")
        }
    }

    // §5.5.12
    public writeElementEntry(segment: ElementSegment) {
        let modeFlags = 0;
        const modeFlagAddr = this.size;

        this.writeByte(modeFlags);
        
        if (segment.mode === ElementSegmentMode.Declarative) modeFlags |= 0b11;
        else if (segment.mode === ElementSegmentMode.Passive) modeFlags |= 0b01;
        
        if (segment.tableIndex !== 0) {
            modeFlags |= 0b10;
            this.writeUint32(segment.tableIndex);
        }


        if (segment.mode === ElementSegmentMode.Active) {
            if (!segment.offset) throw new TypeError("Invalid active element segment - no segment offset found.");

            this.writeInstructionExpression(segment.offset)
        }
        if ((modeFlags & 0b11) !== 0) this.writeByte(segment.type);


        if (typeof (segment.initialization[0] || 0) === "number") {
            this.writeVector(segment.initialization as number[], this.writeUint32);
        } else {
            modeFlags |= 0b100;
            this.writeVector(segment.initialization as InstructionExpression[], this.writeInstructionExpression);
        }

        this.buffer[modeFlagAddr] = modeFlags;
    }

    // §5.5.13
    public writeCodeEntry(functionCode: FunctionCode) {
        const functionWriter = new WasmWriter();

        // Compile locals
        const localCombine: ValueType[][] = [];
        for (const local of functionCode.locals) {
            if (!localCombine.length || localCombine[localCombine.length - 1][0] !== local) localCombine.push([local]);
            else localCombine[localCombine.length - 1].push(local);
        }

        functionWriter.writeVector(localCombine, (localsRaw) => {
            functionWriter.writeUint32(localsRaw.length);
            if (localsRaw.length) functionWriter.writeSignedByte(localsRaw[0]);
        });

        functionWriter.writeInstructionExpression(functionCode.body);

        this.writeByteVector(functionWriter.write());
    }

    // §5.5.14
    public writeDataEntry(segment: DataSegment) {
        this.writeByte(segment.mode);

        switch (segment.mode) {
            case DataSegmentMode.Active:
                this.writeInstructionExpression(segment.offset);
                this.writeByteVector(segment.initialization);
                break;
            case DataSegmentMode.Passive:
                this.writeByteVector(segment.initialization);
                break;
            case DataSegmentMode.ActiveWithMemoryIndex:
                this.writeUint32(segment.memoryIndex);
                this.writeInstructionExpression(segment.offset);
                this.writeByteVector(segment.initialization);
                break;
            default:
                throw new SyntaxError("Unsupported data segment mode");
        }
    }

    public hasSpace(amount = 0) {
        return this.size + amount < this.buffer.byteLength;
    }

    public assert(check: boolean, message: string) {
        if (!check) throw new SyntaxError(message);
    }

    public write() {
        return this.buffer.slice(0, this.size);
    }
}

class WasmBuilder extends WasmWriter {
    public buildHeader() {
        this.writeByte(0x00);
        this.writeByte(0x61);
        this.writeByte(0x73);
        this.writeByte(0x6D);
        this.writeByte(0x01);
        this.writeByte(0x00);
        this.writeByte(0x00);
        this.writeByte(0x00);
    }

    public buildSection<EntryType>(id: SectionId, entryWriterFunc: (entry: EntryType) => void, entries: EntryType[]) {
        if (entries.length === 0) return;
        this.writeByte(id);
        const sectionWriter = new WasmWriter();
        sectionWriter.writeVector(entries, entryWriterFunc);
        this.writeByteVector(sectionWriter.write());
    }
}

export const buildBinary = (wasmModule: WasmModule) => {
    const builder = new WasmBuilder();
    
    builder.buildHeader();
    builder.buildSection(SectionId.Type, builder.writeTypeEntry, wasmModule.types);
    builder.buildSection(SectionId.Import, builder.writeImportEntry, wasmModule.imports);
    builder.buildSection(SectionId.Function, builder.writeFunctionEntry, wasmModule.functions);
    builder.buildSection(SectionId.Table, builder.writeTableEntry, wasmModule.tables);
    builder.buildSection(SectionId.Memory, builder.writeMemoryEntry, wasmModule.memories);
    builder.buildSection(SectionId.Global, builder.writeGlobalEntry, wasmModule.globals);
    builder.buildSection(SectionId.Export, builder.writeExportEntry, wasmModule.exports);
    if (wasmModule.start !== null) builder.writeUint32(wasmModule.start);
    builder.buildSection(SectionId.Code, builder.writeCodeEntry, wasmModule.functions);
    builder.buildSection(SectionId.Data, builder.writeDataEntry, wasmModule.datas);

    return builder.write();
}