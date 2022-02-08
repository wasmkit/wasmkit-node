"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBinary = void 0;
const const_1 = require("./const");
const convo = new ArrayBuffer(8);
const u8 = new Uint8Array(convo);
const f32 = new Float32Array(convo);
const f64 = new Float64Array(convo);
const encoder = new TextEncoder();
class WasmWriter {
    constructor() {
        this.buffer = new Uint8Array(2048);
        this.size = 0;
    }
    expand(amount = 256) {
        const newBuffer = new Uint8Array(this.size + amount);
        newBuffer.set(this.buffer);
        this.buffer = newBuffer;
    }
    writeByte(byte) {
        if (!this.hasSpace(1))
            this.expand();
        this.buffer[this.size++] = byte;
    }
    writeSignedByte(byte) {
        this.writeByte((byte << 25) >>> 25);
    }
    writeInt32(num) {
        while (true) {
            let byte = num & 0x7F;
            num >>= 7;
            if ((num == -1 && (byte & 0x40)) || (num == 0 && !(byte & 0x40))) {
                this.writeByte(byte);
                break;
            }
            else {
                this.writeByte(byte | 0x80);
            }
        }
    }
    writeUint32(num) {
        do {
            let byte = num & 0x7F;
            num >>>= 7;
            this.writeByte(num !== 0 ? 0x80 | byte : byte);
        } while (num);
    }
    writeInt64(num) {
        while (true) {
            let byte = Number(num & 0x7fn);
            num >>= 7n;
            if ((num == -1n && (byte & 0x40)) || (num == 0n && !(byte & 0x40))) {
                this.writeByte(byte);
                break;
            }
            else {
                this.writeByte(byte | 0x80);
            }
        }
    }
    writeFloat32(num) {
        f32[0] = num;
        if (!this.hasSpace(4))
            this.expand();
        this.buffer.set(u8.subarray(0, 4), this.size);
        this.size += 4;
    }
    writeFloat64(num) {
        f64[0] = num;
        if (!this.hasSpace(8))
            this.expand();
        this.buffer.set(u8, this.size);
        this.size += 8;
    }
    writeName(text) {
        this.writeByteVector(encoder.encode(text));
    }
    writeByteVector(bytes, length = bytes.length) {
        if (!this.hasSpace(bytes.length + 5))
            this.expand(bytes.length + 256);
        this.writeUint32(length);
        this.buffer.set(bytes, this.size);
        this.size += bytes.length;
    }
    writeVector(elements, elementWriteFunc, length = elements.length) {
        this.writeUint32(length);
        for (let i = 0; i < elements.length; ++i)
            elementWriteFunc.call(this, elements[i]);
    }
    writeFunctionType(functionType) {
        this.writeByte(0x60);
        this.writeVector(functionType.params, this.writeSignedByte);
        this.writeVector(functionType.results, this.writeSignedByte);
    }
    writeLimits(resizableLimits, writeFlags = true) {
        let flags = 0;
        if (typeof resizableLimits.max === "number")
            flags |= 1;
        if (writeFlags)
            this.writeByte(flags);
        this.writeUint32(resizableLimits.min);
        if (typeof resizableLimits.max === "number")
            this.writeUint32(resizableLimits.max);
    }
    writeMemoryType(memoryType) {
        this.writeLimits(memoryType.limits);
    }
    writeTableType(tableType) {
        this.writeSignedByte(tableType.referenceType);
        this.writeLimits(tableType.limits);
    }
    writeGlobalType(globalType) {
        this.writeSignedByte(globalType.valueType);
        let flags = 0;
        if (globalType.mutable)
            flags |= 1;
        this.writeByte(flags);
    }
    writeInstruction(instruction) {
        if (instruction.opcode > 0xFF) {
            this.writeByte(instruction.opcode >> 8);
            this.writeUint32(instruction.opcode & 0xFF);
        }
        else
            this.writeByte(instruction.opcode);
        const immediates = instruction.immediates;
        switch (instruction.opcode) {
            case 2:
            case 3:
            case 4: {
                if (typeof immediates.valueType === "number")
                    this.writeInt32(immediates.valueType);
                else if (typeof immediates.typeIndex === "number")
                    this.writeInt32(immediates.typeIndex);
                else
                    throw new TypeError("Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                break;
            }
            case 12:
            case 13:
                this.assert(typeof immediates.labelIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.labelIndex);
                break;
            case 14:
                this.assert(typeof immediates.labelIndexs !== "undefined" && typeof immediates.defaultLabelIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeVector(immediates.labelIndexs, this.writeUint32);
                this.writeUint32(immediates.defaultLabelIndex);
                break;
            case 16:
            case 210:
                this.assert(typeof immediates.functionIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.functionIndex);
                break;
            case 17:
                this.assert(typeof immediates.typeIndex === "number" && typeof immediates.tableIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.typeIndex);
                this.writeUint32(immediates.tableIndex);
                break;
            case 208:
                this.assert(typeof immediates.referenceType === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.referenceType);
                break;
            case 28:
                this.assert(typeof immediates.valueTypes !== "undefined", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeVector(immediates.valueTypes, this.writeUint32);
                break;
            case 32:
            case 33:
            case 34:
                this.assert(typeof immediates.localIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.localIndex);
                break;
            case 35:
            case 36:
                this.assert(typeof immediates.globalIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.globalIndex);
                break;
            case 37:
            case 38:
            case 64527:
            case 64528:
            case 64529:
                this.assert(typeof immediates.tableIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.tableIndex);
                break;
            case 64524:
                this.assert(typeof immediates.elementIndex === "number" && typeof immediates.tableIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.elementIndex);
                this.writeUint32(immediates.tableIndex);
            case 64526:
                this.assert(typeof immediates.fromTableIndex === "number" && typeof immediates.toTableIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.fromTableIndex);
                this.writeUint32(immediates.toTableIndex);
                break;
            case 64525:
                this.assert(typeof immediates.elementIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.elementIndex);
                break;
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 58:
            case 59:
            case 60:
            case 61:
            case 62:
            case 64768:
            case 64769:
            case 64770:
            case 64771:
            case 64772:
            case 64773:
            case 64774:
            case 64775:
            case 64776:
            case 64777:
            case 64778:
            case 64860:
            case 64861:
            case 64779:
                this.assert(typeof immediates.memoryArgument !== "undefined", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.memoryArgument.align);
                this.writeUint32(immediates.memoryArgument.offset);
                break;
            case 64852:
            case 64853:
            case 64854:
            case 64855:
            case 64856:
            case 64857:
            case 64858:
            case 64859:
                this.assert(typeof immediates.memoryArgument !== "undefined" && typeof immediates.laneIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.memoryArgument.align);
                this.writeUint32(immediates.memoryArgument.offset);
                this.writeByte(immediates.laneIndex);
                break;
            case 63:
            case 64:
                this.writeByte(0x00);
                break;
            case 64520:
                this.assert(typeof immediates.dataIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.dataIndex);
                this.writeByte(0x00);
                break;
            case 64521:
                this.assert(typeof immediates.dataIndex === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeUint32(immediates.dataIndex);
                break;
            case 64522:
                this.writeByte(0x00);
                this.writeByte(0x00);
                break;
            case 64523:
                this.writeByte(0x00);
                break;
            case 65:
                this.assert(typeof immediates.value === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeInt32(immediates.value);
                break;
            case 66:
                this.assert(typeof immediates.value === "bigint", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeInt64(immediates.value);
                break;
            case 67:
                this.assert(typeof immediates.value === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeFloat32(immediates.value);
                break;
            case 68:
                this.assert(typeof immediates.value === "number", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeFloat64(immediates.value);
                break;
            case 64780:
                this.assert(typeof immediates.bytes !== "undefined", "Invalid immediates found in " + const_1.Opstring[instruction.opcode] + " instruction.");
                this.writeByteVector(immediates.bytes, 16);
                break;
            default:
                this.assert(const_1.Opstring.hasOwnProperty(instruction.opcode), "Unsupported instruction");
        }
    }
    writeInstructionExpression(expression) {
        for (let i = 0; i < expression.length; ++i) {
            this.writeInstruction(expression[i]);
        }
    }
    writeTypeEntry(typeEntry) {
        return this.writeFunctionType(typeEntry);
    }
    writeImportEntry(importEntry) {
        this.writeName(importEntry.module);
        this.writeName(importEntry.name);
        this.writeByte(importEntry.type);
        switch (importEntry.type) {
            case 0:
                this.writeUint32(importEntry.description.typeIndex);
                break;
            case 1:
                this.writeTableType(importEntry.description);
                break;
            case 2:
                this.writeMemoryType(importEntry.description);
                break;
            case 3:
                this.writeGlobalType(importEntry.description);
                break;
            default:
                throw new TypeError("Unsupported external type");
        }
    }
    writeFunctionEntry(funcDescription) {
        this.writeUint32(funcDescription.typeIndex);
    }
    writeTableEntry(tableType) {
        return this.writeTableType(tableType);
    }
    writeMemoryEntry(memoryType) {
        return this.writeMemoryType(memoryType);
    }
    writeGlobalEntry(globalEntry) {
        this.writeGlobalType(globalEntry.type);
        this.writeInstructionExpression(globalEntry.initialization);
    }
    writeExportEntry(exportEntry) {
        this.writeName(exportEntry.name);
        this.writeByte(exportEntry.type);
        switch (exportEntry.type) {
            case 0:
                this.writeUint32(exportEntry.description.functionIndex);
                break;
            case 1:
                this.writeUint32(exportEntry.description.tableIndex);
                break;
            case 2:
                this.writeUint32(exportEntry.description.memoryIndex);
                break;
            case 3:
                this.writeUint32(exportEntry.description.globalIndex);
                break;
            default:
                throw new TypeError("Unsupported external type");
        }
    }
    writeElementEntry(segment) {
        let modeFlags = 0;
        const modeFlagAddr = this.size;
        this.writeByte(modeFlags);
        if (segment.mode === 2)
            modeFlags |= 0b11;
        else if (segment.mode === 1)
            modeFlags |= 0b01;
        if (segment.tableIndex !== 0) {
            modeFlags |= 0b10;
            this.writeUint32(segment.tableIndex);
        }
        if (segment.mode === 0) {
            if (!segment.offset)
                throw new TypeError("Invalid active element segment - no segment offset found.");
            this.writeInstructionExpression(segment.offset);
        }
        if ((modeFlags & 0b11) !== 0)
            this.writeByte(segment.type);
        if (typeof (segment.initialization[0] || 0) === "number") {
            this.writeVector(segment.initialization, this.writeUint32);
        }
        else {
            modeFlags |= 0b100;
            this.writeVector(segment.initialization, this.writeInstructionExpression);
        }
        this.buffer[modeFlagAddr] = modeFlags;
    }
    writeCodeEntry(functionCode) {
        const functionWriter = new WasmWriter();
        const localCombine = [];
        for (const local of functionCode.locals) {
            if (!localCombine.length || localCombine[localCombine.length - 1][0] !== local)
                localCombine.push([local]);
            else
                localCombine[localCombine.length - 1].push(local);
        }
        functionWriter.writeVector(localCombine, (localsRaw) => {
            functionWriter.writeUint32(localsRaw.length);
            if (localsRaw.length)
                functionWriter.writeSignedByte(localsRaw[0]);
        });
        functionWriter.writeInstructionExpression(functionCode.body);
        this.writeByteVector(functionWriter.write());
    }
    writeDataEntry(segment) {
        this.writeByte(segment.mode);
        switch (segment.mode) {
            case 0:
                this.writeInstructionExpression(segment.offset);
                this.writeByteVector(segment.initialization);
                break;
            case 1:
                this.writeByteVector(segment.initialization);
                break;
            case 2:
                this.writeUint32(segment.memoryIndex);
                this.writeInstructionExpression(segment.offset);
                this.writeByteVector(segment.initialization);
                break;
            default:
                throw new SyntaxError("Unsupported data segment mode");
        }
    }
    writeCustomSubSection(custom) {
        this.writeName(custom.name);
        this.writeByteVector(custom.content);
    }
    hasSpace(amount = 0) {
        return this.size + amount < this.buffer.byteLength;
    }
    assert(check, message) {
        if (!check)
            throw new SyntaxError(message);
    }
    write() {
        return this.buffer.slice(0, this.size);
    }
}
class WasmBuilder extends WasmWriter {
    buildHeader() {
        this.writeByte(0x00);
        this.writeByte(0x61);
        this.writeByte(0x73);
        this.writeByte(0x6D);
        this.writeByte(0x01);
        this.writeByte(0x00);
        this.writeByte(0x00);
        this.writeByte(0x00);
    }
    buildSection(id, entryWriterFunc, entries) {
        if (entries.length === 0)
            return;
        this.writeByte(id);
        const sectionWriter = new WasmWriter();
        sectionWriter.writeVector(entries, entryWriterFunc);
        this.writeByteVector(sectionWriter.write());
    }
}
const buildBinary = (wasmModule) => {
    const builder = new WasmBuilder();
    builder.buildHeader();
    builder.buildSection(1, builder.writeTypeEntry, wasmModule.types);
    builder.buildSection(2, builder.writeImportEntry, wasmModule.imports);
    builder.buildSection(3, builder.writeFunctionEntry, wasmModule.functions);
    builder.buildSection(4, builder.writeTableEntry, wasmModule.tables);
    builder.buildSection(5, builder.writeMemoryEntry, wasmModule.memories);
    builder.buildSection(6, builder.writeGlobalEntry, wasmModule.globals);
    builder.buildSection(7, builder.writeExportEntry, wasmModule.exports);
    if (wasmModule.start !== null)
        builder.writeUint32(wasmModule.start);
    builder.buildSection(10, builder.writeCodeEntry, wasmModule.functions);
    builder.buildSection(11, builder.writeDataEntry, wasmModule.datas);
    if (wasmModule.customSections.length) {
        for (let customs = wasmModule.customSections, i = 0; i < customs.length; ++i) {
            const customRaw = new WasmWriter();
            customRaw.writeCustomSubSection(customs[i]);
            builder.writeByte(0);
            builder.writeByteVector(customRaw.write());
        }
    }
    return builder.write();
};
exports.buildBinary = buildBinary;
//# sourceMappingURL=buildBinary.js.map