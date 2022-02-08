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

import { FunctionType, ResizableLimits, MemoryType, TableType, GlobalType, MemoryArgument, Instruction, Opcode, Immediates, Opstring, InstructionExpression, TerminatingEndInstruction, ImportEntry, ExternalType, FunctionDescription, GlobalEntry, ExportEntry, ElementSegment, ElementSegmentMode, ReferenceType, FunctionCode, DataSegment, DataSegmentMode, SectionId, SectionOrder, WasmModule, OpcodePrefixes, ElementKindString, ReferenceTypeString, ElementKind, CustomSubSection } from "./const";

const convo = new ArrayBuffer(8);
const u8 = new Uint8Array(convo);
const f32 = new Float32Array(convo);
const f64 = new Float64Array(convo);
// @ts-ignore
const decoder: { decode(buffer: Uint8Array): string } = new TextDecoder();

class WasmReader {
    private buffer: Uint8Array;
    public at = 0;

    public constructor(buffer: ArrayBuffer) {
        this.buffer = new Uint8Array(buffer);
    }

    // §5.2.1
    public readByte() {
        return this.buffer[this.at++];
    }
    public readSignedByte() {
        return (this.readByte() << 25) >> 25;
    }

    // §5.2.2
    public readInt32() {
        let i = 0;
        let out = 0;
        while (true) {
            const byte = this.buffer[this.at++];

            out |= (byte & 0x7f) << i;
            i += 7;

            if ((0x80 & byte) === 0) {
                if (i < 32 && (byte & 0x40) !== 0) {
                    return out | (~0 << i);
                }

                return out;
            }
        }
    }

    public readUint32() {
        let i = 0;
        let out = 0;

        while (this.buffer[this.at] & 0x80) {
            out |= (this.buffer[this.at++] & 0x7F) << i;
            i += 7;
        }
        out |= (this.buffer[this.at++] & 0x7F) << i;

        return out >>> 0;
    }

    public readInt64() {
        let i = 0n;
        let out = 0n;
        while (true) {
            const byte = this.buffer[this.at++];

            out |= BigInt(byte & 0x7F) << i;
            i += 7n;

            if ((0x80 & byte) === 0) {
                if (i < 128n && (byte & 0x40) !== 0) {
                    return out | (~0n << i);
                }

                return out;
            }
        }
    }

    // §5.2.3
    public readFloat32() {
        u8.set(this.buffer.subarray(this.at, this.at += 4));

        return f32[0];
    }

    public readFloat64() {
        u8.set(this.buffer.subarray(this.at, this.at += 8));

        return f64[0];
    }

    // §5.2.4
    public readName() {
        return decoder.decode(this.readByteVector());
    }

    public readByteVector(length = this.readUint32()) {
        return this.buffer.subarray(this.at, this.at += length);
    }

    // §5.1.3
    public readVector<ElementType>(elementReadFunc: () => ElementType, length = this.readUint32()): ElementType[] {
        const out = Array(length);

        for (let i = 0; i < length; ++i) out[i] = elementReadFunc.call(this);

        return out;
    }

    // §5.3.5
    //
    // TODO:
    // Keep strict byte reading? or implement in ValueType enum or other
    public readFunctionType(): FunctionType {
        this.assert(this.readByte() === 0x60, "Unsupported function type");

        return {
            params: this.readVector(this.readSignedByte),
            results: this.readVector(this.readSignedByte)
        }
    }

    // §5.3.6
    public readLimits(flags = this.readUint32()): ResizableLimits {
        const limits: ResizableLimits = {
            min: this.readUint32()
        }
        if (flags & 1) limits.max = this.readUint32()

        this.assert(typeof limits.max === 'undefined' || limits.max >= limits.min,
            "Limits maximum must be greater than or equal to minimum")

        return limits;
    }

    // §5.3.7
    public readMemoryType(): MemoryType {
        return {
            limits: this.readLimits()
        }
    }

    // §5.3.8
    public readTableType(): TableType {
        return {
            referenceType: this.readSignedByte(),
            limits: this.readLimits()
        }
    }
    // §5.3.9
    public readGlobalType(): GlobalType {
        const valueType = this.readSignedByte();
        const flags = this.readUint32();

        return {
            valueType,
            mutable: (flags & 1) === 1
        }
    }

    // §5.4.6
    public readMemoryArgument(): MemoryArgument {
        return {
            align: this.readUint32(),
            offset: this.readUint32()
        }
    }

    // §5.4
    public readInstruction(): Instruction {
        let opcode: Opcode = this.readByte();

        if (OpcodePrefixes.includes(opcode)) opcode = opcode << 8 | this.readUint32();

        const immediates: Immediates = {};

        switch (opcode) {
            case Opcode.Block:
            case Opcode.Loop:
            case Opcode.If: {
                const type = this.readInt32();
                if (type & 0x8000_0000) immediates.valueType = type;
                else immediates.typeIndex = type;
                break;
            }
            case Opcode.Br:
            case Opcode.BrIf:
                immediates.labelIndex = this.readUint32();
                break;
            case Opcode.BrTable:
                immediates.labelIndexs = this.readVector(this.readUint32);
                immediates.defaultLabelIndex = this.readUint32();
                break;
            case Opcode.Call:
            case Opcode.RefFunc:
                immediates.functionIndex = this.readUint32();
                break;
            case Opcode.CallIndirect:
                immediates.typeIndex = this.readUint32();
                immediates.tableIndex = this.readUint32();
                break;
            case Opcode.RefNull:
                immediates.referenceType = this.readUint32();
                break;
            case Opcode.SelectWithType:
                immediates.valueTypes = this.readVector(this.readUint32);
                break;
            case Opcode.LocalGet:
            case Opcode.LocalSet:
            case Opcode.LocalTee:
                immediates.localIndex = this.readUint32();
                break;
            case Opcode.GlobalGet:
            case Opcode.GlobalSet:
                immediates.globalIndex = this.readUint32();
                break;
            case Opcode.TableGet:
            case Opcode.TableSet:
            case Opcode.TableGrow:
            case Opcode.TableSize:
            case Opcode.TableFill:
                immediates.tableIndex = this.readUint32();
                break;
            case Opcode.TableInit:
                immediates.elementIndex = this.readUint32();
                immediates.tableIndex = this.readUint32();
            case Opcode.TableCopy:
                immediates.fromTableIndex = this.readUint32();
                immediates.toTableIndex = this.readUint32();
                break;
            case Opcode.ElemDrop:
                immediates.elementIndex = this.readUint32();
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
                immediates.memoryArgument = this.readMemoryArgument();
                break;
            case Opcode.V128Load8Lane:
            case Opcode.V128Load16Lane:
            case Opcode.V128Load32Lane:
            case Opcode.V128Load64Lane:
            case Opcode.V128Store8Lane:
            case Opcode.V128Store16Lane:
            case Opcode.V128Store32Lane:
            case Opcode.V128Store64Lane:
                immediates.memoryArgument = this.readMemoryArgument();
                immediates.laneIndex = this.readByte();
                break;
            case Opcode.MemorySize:
            case Opcode.MemoryGrow:
                // Memory Index - not in specification
                this.readByte();
                break;
            case Opcode.MemoryInit:
                immediates.dataIndex = this.readUint32();
                // Memory Index - not in specification
                this.readByte();
                break;
            case Opcode.DataDrop:
                immediates.dataIndex = this.readUint32();
                break;
            case Opcode.MemoryCopy:
                // Memory Index - not in specification
                this.readByte(); // from
                this.readByte(); // to
                break;
            case Opcode.MemoryFill:
                this.readByte();
                break;
            case Opcode.I32Const:
                immediates.value = this.readInt32();
                break;
            case Opcode.I64Const:
                immediates.value = this.readInt64();
                break;
            case Opcode.F32Const:
                immediates.value = this.readFloat32();
                break;
            case Opcode.F64Const:
                immediates.value = this.readFloat64();
                break;
            case Opcode.V128Const:
                immediates.bytes = new Uint8Array(this.readByteVector(16).buffer);
                break;
            case Opcode.I8x16ExtractLane_S:
            case Opcode.I8x16ExtractLane_U:
            case Opcode.I8x16ReplaceLane:
            case Opcode.I16x8ExtractLane_S:
            case Opcode.I16x8ExtractLane_U:
            case Opcode.I16x8ReplaceLane:
            case Opcode.I32x4ExtractLane:
            case Opcode.I32x4ReplaceLane:
            case Opcode.I64x2ExtractLane:
            case Opcode.I64x2ReplaceLane:
            case Opcode.F32x4ExtractLane:
            case Opcode.F32x4ReplaceLane:
            case Opcode.F64x2ExtractLane:
            case Opcode.F64x2ReplaceLane:
                immediates.laneIndex = this.readByte();
                break;
            case Opcode.I8x16Shuffle:
                immediates.laneIndexs = Array.from(this.readByteVector(16));
                break;
            default:
                this.assert(Opstring.hasOwnProperty(opcode),
                    "Unsupported instruction")
        }

        return {
            opcode,
            immediates
        }
    }

    // §5.4.8
    public readInstructionExpression(): InstructionExpression {
        const instructions: Instruction[] = [];
        let depth = 0;

        while (true) {
            const instruction = this.readInstruction();

            if (depth === 0 && instruction.opcode === Opcode.End) break;

            instructions.push(instruction);

            switch (instruction.opcode) {
                case Opcode.End:
                    // case Opcode.Else:
                    depth -= 1;
                    break;
                case Opcode.Block:
                case Opcode.Loop:
                case Opcode.If:
                    // case Opcode.Else:
                    depth += 1;
                    break;
            }
        }

        return [...instructions, TerminatingEndInstruction];
    }

    // §5.5.3
    public readCustomSubSection(end: number): CustomSubSection {
        return {
            name: this.readName(),
            content: this.readByteVector(end - this.at),
        }
    }

    // §5.5.4
    public readTypeEntry() {
        return this.readFunctionType();
    }

    // §5.5.5
    public readImportEntry(): ImportEntry {
        const module = this.readName();
        const name = this.readName();
        const type = this.readByte();

        switch (type) {
            case ExternalType.Function:
                return {
                    module,
                    name,
                    type,
                    description: {
                        typeIndex: this.readUint32()
                    }
                }
            case ExternalType.Table:
                return {
                    module,
                    name,
                    type,
                    description: this.readTableType()
                }
            case ExternalType.Memory:
                return {
                    module,
                    name,
                    type,
                    description: this.readMemoryType()
                }
            case ExternalType.Global:
                return {
                    module,
                    name,
                    type,
                    description: this.readGlobalType()
                }
            default:
                throw new SyntaxError("Unsupported external type")
        }
    }

    // §5.5.6
    public readFunctionEntry(): FunctionDescription {
        return {
            typeIndex: this.readUint32()
        }
    }

    // §5.5.7
    public readTableEntry(): TableType {
        return this.readTableType();
    }

    // §5.5.8
    public readMemoryEntry(): MemoryType {
        return this.readMemoryType();
    }

    // §5.5.9
    public readGlobalEntry(): GlobalEntry {
        return {
            type: this.readGlobalType(),
            initialization: this.readInstructionExpression()
        }
    }

    // §5.5.10
    public readExportEntry(): ExportEntry {
        const name = this.readName();
        const type = this.readByte();

        switch (type) {
            case ExternalType.Function:
                return {
                    name,
                    type,
                    description: {
                        functionIndex: this.readUint32()
                    }
                }
            case ExternalType.Table:
                return {
                    name,
                    type,
                    description: {
                        tableIndex: this.readUint32()
                    }
                }
            case ExternalType.Memory:
                return {
                    name,
                    type,
                    description: {
                        memoryIndex: this.readUint32()
                    }
                }
            case ExternalType.Global:
                return {
                    name,
                    type,
                    description: {
                        globalIndex: this.readUint32()
                    }
                }
            default:
                throw new SyntaxError("Unsupported external type")
        }
    }

    // §5.5.12
    public readElementEntry(): ElementSegment {
        const modeFlags = this.readByte() & 0b111;

        let mode;
        if ((modeFlags & 0b1) === 0) mode = ElementSegmentMode.Active;
        else if ((modeFlags & 0b11) === 0b11) mode = ElementSegmentMode.Declarative;
        else mode = ElementSegmentMode.Passive;

        const segment: ElementSegment = {
            mode,
            tableIndex: 0,
            type: ReferenceType.FunctionReference,
            initialization: []
        }

        if ((modeFlags & 0b10) === 0b10) segment.tableIndex = this.readUint32();
        if (mode === ElementSegmentMode.Active) segment.offset = this.readInstructionExpression();

        if ((modeFlags & 0b11) !== 0) {
            segment.type = this.readByte();

            this.assert(typeof ElementKindString[segment.type as ElementKind] === "string" || typeof ReferenceTypeString[segment.type as ReferenceType] === "string", "Invalid element type");
        }

        if ((modeFlags & 0b100) === 0) segment.initialization = this.readVector(this.readUint32);
        else segment.initialization = this.readVector(this.readInstructionExpression);

        return segment;
    }

    // §5.5.13
    public readCodeEntry(): FunctionCode {
        const size = this.readUint32();
        const start = this.at;

        const code: FunctionCode = {
            locals: this.readVector(() => Array(this.readUint32()).fill(this.readSignedByte())).flat(),
            body: this.readInstructionExpression()
        }

        this.assert(this.at - start === size,
            "Size does not match function code's length");

        return code;
    }

    // §5.5.14
    public readDataEntry(): DataSegment {
        const mode: DataSegmentMode = this.readByte();

        switch (mode) {
            case DataSegmentMode.Active:
                return {
                    mode,
                    memoryIndex: 0,
                    offset: this.readInstructionExpression(),
                    initialization: this.readByteVector()
                }
            case DataSegmentMode.Passive:
                return {
                    mode,
                    initialization: this.readByteVector()
                }
            case DataSegmentMode.ActiveWithMemoryIndex:
                return {
                    mode,
                    memoryIndex: this.readUint32(),
                    offset: this.readInstructionExpression(),
                    initialization: this.readByteVector()
                }
            default:
                throw new SyntaxError("Unsupported data segment mode");
        }
    }

    public inBuffer() {
        return this.at < this.buffer.byteLength;
    }

    public assert(check: boolean, message: string) {
        if (!check) throw new SyntaxError(message);
    }
}

export const parseBinary = (buffer: Uint8Array): WasmModule => {
    const reader = new WasmReader(buffer);
    
    reader.assert((reader.readByte() << 24 |
        reader.readByte() << 16 |
        reader.readByte() << 8 |
        reader.readByte()) === 0x0061736D, 'Invalid magic');
    reader.assert((reader.readByte() |
        reader.readByte() << 8 |
        reader.readByte() << 16 |
        reader.readByte() << 24) === 1, 'Unknown version');

    const readSectionIds: SectionId[] = [];
    let typeRaw: FunctionType[] = [],
        importRaw: ImportEntry[] = [],
        functionRaw: FunctionDescription[] = [],
        tableRaw: TableType[] = [],
        memoryRaw: MemoryType[] = [],
        globalRaw: GlobalEntry[] = [],
        exportRaw: ExportEntry[] = [],
        startRaw: number | null = null,
        elementRaw: ElementSegment[] = [],
        dataCount: number | null = null,
        codeRaw: FunctionCode[] = [],
        dataRaw: DataSegment[] = [],
        customSections: CustomSubSection[] = [];
    let orderPos = -1;
    
    while (reader.inBuffer()) {
        const id: SectionId = reader.readByte();
        const size = reader.readUint32();
        const end = reader.at + size;
        let newOrderPos = SectionOrder.indexOf(id);
        reader.assert(!SectionOrder.includes(id) || newOrderPos > orderPos,
            "Section " + id + " may not occur after " + SectionOrder[orderPos]);
        orderPos = newOrderPos;
        
        if (id !== SectionId.Custom) {
            reader.assert(!readSectionIds.includes(id),
                "Section " + id + " may only occur once")
            readSectionIds.push(id);
        }
        switch (id) {
            case SectionId.Custom: 
                customSections.push(reader.readCustomSubSection(end));
                break;
            case SectionId.Type:
                typeRaw = reader.readVector(reader.readTypeEntry);
                break;
            case SectionId.Import:
                importRaw = reader.readVector(reader.readImportEntry);
                break;
            case SectionId.Function:
                functionRaw = reader.readVector(reader.readFunctionEntry);
                break;
            case SectionId.Table:
                tableRaw = reader.readVector(reader.readTableEntry);
                break;
            case SectionId.Memory:
                memoryRaw = reader.readVector(reader.readMemoryEntry);
                break;
            case SectionId.Global:
                globalRaw = reader.readVector(reader.readGlobalEntry);
                break;
            case SectionId.Export:
                exportRaw = reader.readVector(reader.readExportEntry);
                break;
            case SectionId.Start:
                startRaw = reader.readUint32();
                break;
            case SectionId.Element:
                elementRaw = reader.readVector(reader.readElementEntry);
                break;
            case SectionId.Code:
                codeRaw = reader.readVector(reader.readCodeEntry);
                reader.assert(functionRaw && codeRaw.length === functionRaw.length,
                    "For each function entry there should be a code entry, and vice versa");
                break;
            case SectionId.Data:
                dataRaw = reader.readVector(reader.readDataEntry);
                reader.assert(dataCount === null || dataRaw.length === dataCount,
                    "Data entry count must be equal to predefined data count");
                break;
            case SectionId.DataCount:
                dataCount = reader.readUint32();
                break;
        }
        reader.assert(reader.at === end,
            "Size does not match section's length");
    }
    return {
        customSections,
        types: typeRaw,
        functions: codeRaw.map((code, index) => ({ 
            locals: code.locals,
            body: code.body,
            typeIndex: functionRaw[index].typeIndex
        })),
        tables: tableRaw,
        memories: memoryRaw,
        globals: globalRaw,
        elements: elementRaw,
        datas: dataRaw,
        start: startRaw,
        imports: importRaw,
        exports: exportRaw
    };
}
