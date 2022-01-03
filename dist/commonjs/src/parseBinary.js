"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBinary = void 0;
const const_1 = require("./const");
const convo = new ArrayBuffer(8);
const u8 = new Uint8Array(convo);
const f32 = new Float32Array(convo);
const f64 = new Float64Array(convo);
const decoder = new TextDecoder();
class WasmReader {
    constructor(buffer) {
        this.at = 0;
        this.buffer = new Uint8Array(buffer);
    }
    readByte() {
        return this.buffer[this.at++];
    }
    readSignedByte() {
        return (this.readByte() << 25) >> 25;
    }
    readInt32() {
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
    readUint32() {
        let i = 0;
        let out = 0;
        while (this.buffer[this.at] & 0x80) {
            out |= (this.buffer[this.at++] & 0x7F) << i;
            i += 7;
        }
        out |= (this.buffer[this.at++] & 0x7F) << i;
        return out >>> 0;
    }
    readInt64() {
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
    readFloat32() {
        u8.set(this.buffer.subarray(this.at, this.at += 4));
        return f32[0];
    }
    readFloat64() {
        u8.set(this.buffer.subarray(this.at, this.at += 8));
        return f64[0];
    }
    readName() {
        return decoder.decode(this.readByteVector());
    }
    readByteVector(length = this.readUint32()) {
        return this.buffer.subarray(this.at, this.at += length);
    }
    readVector(elementReadFunc, length = this.readUint32()) {
        const out = Array(length);
        for (let i = 0; i < length; ++i)
            out[i] = elementReadFunc.call(this);
        return out;
    }
    readFunctionType() {
        this.assert(this.readByte() === 0x60, "Unsupported function type");
        return {
            params: this.readVector(this.readSignedByte),
            results: this.readVector(this.readSignedByte)
        };
    }
    readLimits(flags = this.readUint32()) {
        const limits = {
            min: this.readUint32()
        };
        if (flags & 1)
            limits.max = this.readUint32();
        this.assert(typeof limits.max === 'undefined' || limits.max >= limits.min, "Limits maximum must be greater than or equal to minimum");
        return limits;
    }
    readMemoryType() {
        return {
            limits: this.readLimits()
        };
    }
    readTableType() {
        return {
            referenceType: this.readSignedByte(),
            limits: this.readLimits()
        };
    }
    readGlobalType() {
        const valueType = this.readSignedByte();
        const flags = this.readUint32();
        return {
            valueType,
            mutable: (flags & 1) === 1
        };
    }
    readMemoryArgument() {
        return {
            align: this.readUint32(),
            offset: this.readUint32()
        };
    }
    readInstruction() {
        let opcode = this.readByte();
        if (const_1.OpcodePrefixes.includes(opcode))
            opcode = opcode << 8 | this.readUint32();
        const immediates = {};
        switch (opcode) {
            case 2:
            case 3:
            case 4: {
                const type = this.readInt32();
                if (type & 2147483648)
                    immediates.valueType = type;
                else
                    immediates.typeIndex = type;
                break;
            }
            case 12:
            case 13:
                immediates.labelIndex = this.readUint32();
                break;
            case 14:
                immediates.labelIndexs = this.readVector(this.readUint32);
                immediates.defaultLabelIndex = this.readUint32();
                break;
            case 16:
            case 210:
                immediates.functionIndex = this.readUint32();
                break;
            case 17:
                immediates.typeIndex = this.readUint32();
                immediates.tableIndex = this.readUint32();
                break;
            case 208:
                immediates.referenceType = this.readUint32();
                break;
            case 28:
                immediates.valueTypes = this.readVector(this.readUint32);
                break;
            case 32:
            case 33:
            case 34:
                immediates.localIndex = this.readUint32();
                break;
            case 35:
            case 36:
                immediates.globalIndex = this.readUint32();
                break;
            case 37:
            case 38:
            case 64527:
            case 64528:
            case 64529:
                immediates.tableIndex = this.readUint32();
                break;
            case 64524:
                immediates.elementIndex = this.readUint32();
                immediates.tableIndex = this.readUint32();
            case 64526:
                immediates.fromTableIndex = this.readUint32();
                immediates.toTableIndex = this.readUint32();
                break;
            case 64525:
                immediates.elementIndex = this.readUint32();
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
                immediates.memoryArgument = this.readMemoryArgument();
                break;
            case 64852:
            case 64853:
            case 64854:
            case 64855:
            case 64856:
            case 64857:
            case 64858:
            case 64859:
                immediates.memoryArgument = this.readMemoryArgument();
                immediates.laneIndex = this.readByte();
                break;
            case 63:
            case 64:
                this.readByte();
                break;
            case 64520:
                immediates.dataIndex = this.readUint32();
                this.readByte();
                break;
            case 64521:
                immediates.dataIndex = this.readUint32();
                break;
            case 64522:
                this.readByte();
                this.readByte();
                break;
            case 64523:
                this.readByte();
                break;
            case 65:
                immediates.value = this.readInt32();
                break;
            case 66:
                immediates.value = this.readInt64();
                break;
            case 67:
                immediates.value = this.readFloat32();
                break;
            case 68:
                immediates.value = this.readFloat64();
                break;
            case 64780:
                immediates.bytes = new Uint8Array(this.readByteVector(16).buffer);
                break;
            case 64789:
            case 64790:
            case 64791:
            case 64792:
            case 64793:
            case 64794:
            case 64795:
            case 64796:
            case 64797:
            case 64798:
            case 64799:
            case 64800:
            case 64801:
            case 64802:
                immediates.laneIndex = this.readByte();
                break;
            case 64781:
                immediates.laneIndexs = Array.from(this.readByteVector(16));
                break;
            default:
                this.assert(const_1.Opstring.hasOwnProperty(opcode), "Unsupported instruction");
        }
        return {
            opcode,
            immediates
        };
    }
    readInstructionExpression() {
        const instructions = [];
        let depth = 0;
        while (true) {
            const instruction = this.readInstruction();
            if (depth === 0 && instruction.opcode === 11)
                break;
            instructions.push(instruction);
            switch (instruction.opcode) {
                case 11:
                    depth -= 1;
                    break;
                case 2:
                case 3:
                case 4:
                    depth += 1;
                    break;
            }
        }
        return [...instructions, const_1.TerminatingEndInstruction];
    }
    readTypeEntry() {
        return this.readFunctionType();
    }
    readImportEntry() {
        const module = this.readName();
        const name = this.readName();
        const type = this.readByte();
        switch (type) {
            case 0:
                return {
                    module,
                    name,
                    type,
                    description: {
                        typeIndex: this.readUint32()
                    }
                };
            case 1:
                return {
                    module,
                    name,
                    type,
                    description: this.readTableType()
                };
            case 2:
                return {
                    module,
                    name,
                    type,
                    description: this.readMemoryType()
                };
            case 3:
                return {
                    module,
                    name,
                    type,
                    description: this.readGlobalType()
                };
            default:
                throw new SyntaxError("Unsupported external type");
        }
    }
    readFunctionEntry() {
        return {
            typeIndex: this.readUint32()
        };
    }
    readTableEntry() {
        return this.readTableType();
    }
    readMemoryEntry() {
        return this.readMemoryType();
    }
    readGlobalEntry() {
        return {
            type: this.readGlobalType(),
            initialization: this.readInstructionExpression()
        };
    }
    readExportEntry() {
        const name = this.readName();
        const type = this.readByte();
        switch (type) {
            case 0:
                return {
                    name,
                    type,
                    description: {
                        functionIndex: this.readUint32()
                    }
                };
            case 1:
                return {
                    name,
                    type,
                    description: {
                        tableIndex: this.readUint32()
                    }
                };
            case 2:
                return {
                    name,
                    type,
                    description: {
                        memoryIndex: this.readUint32()
                    }
                };
            case 3:
                return {
                    name,
                    type,
                    description: {
                        globalIndex: this.readUint32()
                    }
                };
            default:
                throw new SyntaxError("Unsupported external type");
        }
    }
    readElementEntry() {
        const modeFlags = this.readByte() & 0b111;
        let mode;
        if ((modeFlags & 0b1) === 0)
            mode = 0;
        else if ((modeFlags & 0b11) === 0b11)
            mode = 2;
        else
            mode = 1;
        const segment = {
            mode,
            tableIndex: 0,
            type: -16,
            initialization: []
        };
        if ((modeFlags & 0b10) === 0b10)
            segment.tableIndex = this.readUint32();
        if (mode === 0)
            segment.offset = this.readInstructionExpression();
        if ((modeFlags & 0b11) !== 0) {
            segment.type = this.readByte();
            this.assert(typeof const_1.ElementKindString[segment.type] === "string" || typeof const_1.ReferenceTypeString[segment.type] === "string", "Invalid element type");
        }
        if ((modeFlags & 0b100) === 0)
            segment.initialization = this.readVector(this.readUint32);
        else
            segment.initialization = this.readVector(this.readInstructionExpression);
        return segment;
    }
    readCodeEntry() {
        const size = this.readUint32();
        const start = this.at;
        const code = {
            locals: this.readVector(() => Array(this.readUint32()).fill(this.readSignedByte())).flat(),
            body: this.readInstructionExpression()
        };
        this.assert(this.at - start === size, "Size does not match function code's length");
        return code;
    }
    readDataEntry() {
        const mode = this.readByte();
        switch (mode) {
            case 0:
                return {
                    mode,
                    memoryIndex: 0,
                    offset: this.readInstructionExpression(),
                    initialization: this.readByteVector()
                };
            case 1:
                return {
                    mode,
                    initialization: this.readByteVector()
                };
            case 2:
                return {
                    mode,
                    memoryIndex: this.readUint32(),
                    offset: this.readInstructionExpression(),
                    initialization: this.readByteVector()
                };
            default:
                throw new SyntaxError("Unsupported data segment mode");
        }
    }
    inBuffer() {
        return this.at < this.buffer.byteLength;
    }
    assert(check, message) {
        if (!check)
            throw new SyntaxError(message);
    }
}
const parseBinary = (buffer) => {
    const reader = new WasmReader(buffer);
    reader.assert((reader.readByte() << 24 |
        reader.readByte() << 16 |
        reader.readByte() << 8 |
        reader.readByte()) === 0x0061736D, 'Invalid magic');
    reader.assert((reader.readByte() |
        reader.readByte() << 8 |
        reader.readByte() << 16 |
        reader.readByte() << 24) === 1, 'Unknown version');
    const readSectionIds = [];
    let typeRaw = [], importRaw = [], functionRaw = [], tableRaw = [], memoryRaw = [], globalRaw = [], exportRaw = [], startRaw = null, elementRaw = [], dataCount = null, codeRaw = [], dataRaw = [];
    let orderPos = -1;
    while (reader.inBuffer()) {
        const id = reader.readByte();
        const size = reader.readUint32();
        const start = reader.at;
        let newOrderPos = const_1.SectionOrder.indexOf(id);
        reader.assert(!const_1.SectionOrder.includes(id) || newOrderPos > orderPos, "Section " + id + " may not occur after " + const_1.SectionOrder[orderPos]);
        orderPos = newOrderPos;
        if (id !== 0) {
            reader.assert(!readSectionIds.includes(id), "Section " + id + " may only occur once");
            readSectionIds.push(id);
        }
        switch (id) {
            case 0:
                reader.at += size;
                break;
            case 1:
                typeRaw = reader.readVector(reader.readTypeEntry);
                break;
            case 2:
                importRaw = reader.readVector(reader.readImportEntry);
                break;
            case 3:
                functionRaw = reader.readVector(reader.readFunctionEntry);
                break;
            case 4:
                tableRaw = reader.readVector(reader.readTableEntry);
                break;
            case 5:
                memoryRaw = reader.readVector(reader.readMemoryEntry);
                break;
            case 6:
                globalRaw = reader.readVector(reader.readGlobalEntry);
                break;
            case 7:
                exportRaw = reader.readVector(reader.readExportEntry);
                break;
            case 8:
                startRaw = reader.readUint32();
                break;
            case 9:
                elementRaw = reader.readVector(reader.readElementEntry);
                break;
            case 10:
                codeRaw = reader.readVector(reader.readCodeEntry);
                reader.assert(functionRaw && codeRaw.length === functionRaw.length, "For each function entry there should be a code entry, and vice versa");
                break;
            case 11:
                dataRaw = reader.readVector(reader.readDataEntry);
                reader.assert(dataCount === null || dataRaw.length === dataCount, "Data entry count must be equal to predefined data count");
                break;
            case 12:
                dataCount = reader.readUint32();
                break;
        }
        reader.assert(reader.at - start === size, "Size does not match section's length");
    }
    return {
        customSections: {},
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
};
exports.parseBinary = parseBinary;
//# sourceMappingURL=parseBinary.js.map