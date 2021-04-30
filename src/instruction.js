const { OPCODE } = require('./const');

const valuedOps = [OPCODE.I32_CONST, OPCODE.F32_CONST, OPCODE.F64_CONST, OPCODE.I64]
class Instruction {
    static readFrom(reader) {
        const op = reader.u8();
        let immediates = [];
        switch (op) {
            case OPCODE.BLOCK:
                immediates.push(reader.readTypeEnc());
                break;
            case OPCODE.LOOP:
                immediates.push(reader.readTypeEnc());
                break;
            case OPCODE.IF:
                immediates.push(reader.readTypeEnc());
                break;
            case OPCODE.BR:
                immediates.push(reader.vu32());
                break;
            case OPCODE.BR_IF:
                immediates.push(reader.vu32());
                break;
            case OPCODE.BR_TABLE:
                const len = reader.vu32();

                immediates.push(len);

                for (let i = 0; i < len; ++i) {
                    immediates.push(reader.vu32());
                }

                immediates.push(reader.vu32());
                break;
            case OPCODE.CALL:
                immediates.push(reader.vu32());
                break;
            case OPCODE.CALL_INDIRECT:
                immediates.push(reader.vu32());
                immediates.push(reader.u8());
                break;
            case OPCODE.GET_LOCAL:
                immediates.push(reader.vu32());
                break;
            case OPCODE.SET_LOCAL:
                immediates.push(reader.vu32());
                break;
            case OPCODE.TEE_LOCAL:
                immediates.push(reader.vu32());
                break;
            case OPCODE.GET_GLOBAL:
                immediates.push(reader.vu32());
                break;
            case OPCODE.SET_GLOBAL:
                immediates.push(reader.vu32());
                break;
            case OPCODE.I32_LOAD:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I64_LOAD:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.F32_LOAD:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.F64_LOAD:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I32_LOAD8_S:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I32_LOAD8_U:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I32_LOAD16_S:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I32_LOAD16_U:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I64_LOAD8_S:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I64_LOAD8_U:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I64_LOAD16_S:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I64_LOAD16_U:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I64_LOAD32_S:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I64_LOAD32_U:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I32_STORE:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I64_STORE:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.F32_STORE:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.F64_STORE:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I32_STORE8:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I32_STORE16:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I64_STORE8:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I64_STORE16:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.I64_STORE32:
                immediates = [reader.vu32(), reader.vu32()] // align, offset
                immediates.align = immediates[0];
                immediates.offset = immediates[1];
                break;
            case OPCODE.MEMORY_SIZE:
                immediates.push(reader.u8());
                break;
            case OPCODE.MEMORY_GROW:
                immediates.push(reader.u8());
                break;
            case OPCODE.I32_CONST:
                immediates.push(reader.vu32());
                break;
            case OPCODE.I64_CONST:
                immediates.push(reader.vu64());
                break;
            case OPCODE.F32_CONST:
                immediates.push(reader.f32());
                break;
            case OPCODE.F64_CONST:
                immediates.push(reader.f64());
                break;
            default:
                if (OPCODE > 0xFE) throw "Unsupported opcode " + op;
        }

        return new Instruction(op, immediates);
    }

    constructor(opcode, immediates) {
        this.opcode = opcode;
        this.immediates = immediates;

        if (valuedOps.indexOf(opcode) !== -1) this.value = immediates[0] ?? null;
    }
}

module.exports = Instruction;