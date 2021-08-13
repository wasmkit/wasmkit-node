/*
MIT License

Copyright (c) 2021 Andrew T

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

const SECTION = {};
SECTION[SECTION.CUSTOM    = 0] = "customs";
SECTION[SECTION.SIGNATURE = 1] = "signature";
SECTION[SECTION.IMPORT    = 2] = "import";
SECTION[SECTION.FUNCTION  = 3] = "function";
SECTION[SECTION.TABLE     = 4] = "table";
SECTION[SECTION.MEMORY    = 5] = "memory";
SECTION[SECTION.GLOBAL    = 6] = "global";
SECTION[SECTION.EXPORT    = 7] = "export";
SECTION[SECTION.START     = 8] = "start";
SECTION[SECTION.ELEMENT   = 9] = "element";
SECTION[SECTION.CODE      = 10] = "code";
SECTION[SECTION.DATA      = 11] = "data";

const MAX_SECTION_ID = SECTION.DATA;

const VALUE_TYPE = {};
VALUE_TYPE[VALUE_TYPE.I32      = 0x7f] = "i32";
VALUE_TYPE[VALUE_TYPE.I64      = 0x7e] = "i64";
VALUE_TYPE[VALUE_TYPE.F32      = 0x7d] = "f32";
VALUE_TYPE[VALUE_TYPE.F64      = 0x7c] = "f64";
VALUE_TYPE[VALUE_TYPE.FUNC_REF = 0x70] = "funcref";
VALUE_TYPE[VALUE_TYPE.FUNC     = 0x60] = "func";
VALUE_TYPE[VALUE_TYPE.BLOCK    = 0x40] = "void";

const VARIABLE_TYPES = [VALUE_TYPE.I32, VALUE_TYPE.F32, VALUE_TYPE.I64, VALUE_TYPE.F64];

const KIND = {};
KIND[KIND.FUNC   = 0x00] = "func";
KIND[KIND.TABLE  = 0x01] = "table";
KIND[KIND.MEMORY = 0x02] = "memory";
KIND[KIND.GLOBAL = 0x03] = "global";

const NAME_SUBSECTION = {};
NAME_SUBSECTION[NAME_SUBSECTION.MODULE   = 0] = "module";
NAME_SUBSECTION[NAME_SUBSECTION.FUNCTION = 1] = "function";
NAME_SUBSECTION[NAME_SUBSECTION.LOCAL    = 2] = "local";

// op code property naming conventions from WAIL (github.com/Qwokka/WAIL)
const OP = {}
OP[OP.UNREACHABLE         = 0x00] = "unreachable";
OP[OP.NOP                 = 0x01] = "nop";
OP[OP.BLOCK               = 0x02] = "block";
OP[OP.LOOP                = 0x03] = "loop";
OP[OP.IF                  = 0x04] = "if";
OP[OP.ELSE                = 0x05] = "else";
OP[OP.END                 = 0x0B] = "end";
OP[OP.BR                  = 0x0C] = "br";
OP[OP.BR_IF               = 0x0D] = "br_if";
OP[OP.BR_TABLE            = 0x0E] = "br_table";
OP[OP.RETURN              = 0x0F] = "return";
OP[OP.CALL                = 0x10] = "call";
OP[OP.CALL_INDIRECT       = 0x11] = "call_indirect";
OP[OP.DROP                = 0x1A] = "drop";
OP[OP.SELECT              = 0x1B] = "select";
OP[OP.GET_LOCAL           = 0x20] = "local.get";
OP[OP.SET_LOCAL           = 0x21] = "local.set";
OP[OP.TEE_LOCAL           = 0x22] = "local.tee";
OP[OP.GET_GLOBAL          = 0x23] = "global.get";
OP[OP.SET_GLOBAL          = 0x24] = "global.set";
OP[OP.I32_LOAD            = 0x28] = "i32.load";
OP[OP.I64_LOAD            = 0x29] = "i64.load";
OP[OP.F32_LOAD            = 0x2A] = "f32.load";
OP[OP.F64_LOAD            = 0x2B] = "f64.load";
OP[OP.I32_LOAD8_S         = 0x2C] = "i32.load8_s";
OP[OP.I32_LOAD8_U         = 0x2D] = "i32.load8_u";
OP[OP.I32_LOAD16_S        = 0x2E] = "i32.load16_s";
OP[OP.I32_LOAD16_U        = 0x2F] = "i32.load16_u";
OP[OP.I64_LOAD8_S         = 0x30] = "i64.load8_s";
OP[OP.I64_LOAD8_U         = 0x31] = "i64.load8_u";
OP[OP.I64_LOAD16_S        = 0x32] = "i64.load16_s";
OP[OP.I64_LOAD16_U        = 0x33] = "i64.load16_u";
OP[OP.I64_LOAD32_S        = 0x34] = "i64.load32_s";
OP[OP.I64_LOAD32_U        = 0x35] = "i64.load32_u";
OP[OP.I32_STORE           = 0x36] = "i32.store";
OP[OP.I64_STORE           = 0x37] = "i64.store";
OP[OP.F32_STORE           = 0x38] = "f32.store";
OP[OP.F64_STORE           = 0x39] = "f64.store";
OP[OP.I32_STORE8          = 0x3A] = "i32.store8";
OP[OP.I32_STORE16         = 0x3B] = "i32.store16";
OP[OP.I64_STORE8          = 0x3C] = "i64.store8";
OP[OP.I64_STORE16         = 0x3D] = "i643.store16";
OP[OP.I64_STORE32         = 0x3E] = "i64.store32";
OP[OP.MEMORY_SIZE         = 0x3F] = "memory.size";
OP[OP.MEMORY_GROW         = 0x40] = "memory.grow";
OP[OP.I32_CONST           = 0x41] = "i32.const";
OP[OP.I64_CONST           = 0x42] = "i64.const";
OP[OP.F32_CONST           = 0x43] = "f32.const";
OP[OP.F64_CONST           = 0x44] = "f64.const";
OP[OP.I32_EQZ             = 0x45] = "i32.eqz";
OP[OP.I32_EQ              = 0x46] = "i32.eq";
OP[OP.I32_NE              = 0x47] = "i32.ne";
OP[OP.I32_LT_S            = 0x48] = "i32.lt_s";
OP[OP.I32_LT_U            = 0x49] = "i32.lt_u";
OP[OP.I32_GT_S            = 0x4A] = "i32.gt_s";
OP[OP.I32_GT_U            = 0x4B] = "i32.gt_u";
OP[OP.I32_LE_S            = 0x4C] = "i32.le_s";
OP[OP.I32_LE_U            = 0x4D] = "i32.le_u";
OP[OP.I32_GE_S            = 0x4E] = "i32.ge_s";
OP[OP.I32_GE_U            = 0x4F] = "i32.ge_u";
OP[OP.I64_EQZ             = 0x50] = "i64.eqz";
OP[OP.I64_EQ              = 0x51] = "i64.eq";
OP[OP.I64_NE              = 0x52] = "i64.ne";
OP[OP.I64_LT_S            = 0x53] = "i64.lt_s";
OP[OP.I64_LT_U            = 0x54] = "i64.lt_u";
OP[OP.I64_GT_S            = 0x55] = "i64.gt_s";
OP[OP.I64_GT_U            = 0x56] = "i64.gt_u";
OP[OP.I64_LE_S            = 0x57] = "i64.le_s";
OP[OP.I64_LE_U            = 0x58] = "i64.le_u";
OP[OP.I64_GE_S            = 0x59] = "i64.ge_s";
OP[OP.I64_GE_U            = 0x5A] = "i64.ge_u";
OP[OP.F32_EQ              = 0x5B] = "f32.eq";
OP[OP.F32_NE              = 0x5C] = "f32.ne";
OP[OP.F32_LT              = 0x5D] = "f32.lt";
OP[OP.F32_GT              = 0x5E] = "f32.gt";
OP[OP.F32_LE              = 0x5F] = "f32.le";
OP[OP.F32_GE              = 0x60] = "f32.ge";
OP[OP.F64_EQ              = 0x61] = "f64.eq";
OP[OP.F64_NE              = 0x62] = "f64.ne";
OP[OP.F64_LT              = 0x63] = "f64.lt";
OP[OP.F64_GT              = 0x64] = "f64.gt";
OP[OP.F64_LE              = 0x65] = "f64.le";
OP[OP.F64_GE              = 0x66] = "f64.ge";
OP[OP.I32_CLZ             = 0x67] = "i32.clz";
OP[OP.I32_CTZ             = 0x68] = "i32.ctz";
OP[OP.I32_POPCNT          = 0x69] = "i32.popcnt";
OP[OP.I32_ADD             = 0x6A] = "i32.add";
OP[OP.I32_SUB             = 0x6B] = "i32.sub";
OP[OP.I32_MUL             = 0x6C] = "i32.mul";
OP[OP.I32_DIV_S           = 0x6D] = "i32.div_s";
OP[OP.I32_DIV_U           = 0x6E] = "i32.div_u";
OP[OP.I32_REM_S           = 0x6F] = "i32.rem_s";
OP[OP.I32_REM_U           = 0x70] = "i32.rem_u";
OP[OP.I32_AND             = 0x71] = "i32.and";
OP[OP.I32_OR              = 0x72] = "i32.or";
OP[OP.I32_XOR             = 0x73] = "i32.xor";
OP[OP.I32_SHL             = 0x74] = "i32.shl";
OP[OP.I32_SHR_S           = 0x75] = "i32.shr_s";
OP[OP.I32_SHR_U           = 0x76] = "i32.shr_u";
OP[OP.I32_ROTL            = 0x77] = "i32.rotl";
OP[OP.I32_ROTR            = 0x78] = "i32.rotr";
OP[OP.I64_CLZ             = 0x79] = "i64.clz";
OP[OP.I64_CTZ             = 0x7A] = "i64.ctz";
OP[OP.I64_POPCNT          = 0x7B] = "i64.popcnt";
OP[OP.I64_ADD             = 0x7C] = "i64.add";
OP[OP.I64_SUB             = 0x7D] = "i64.sub";
OP[OP.I64_MUL             = 0x7E] = "i64.mul";
OP[OP.I64_DIV_S           = 0x7F] = "i64.div_s";
OP[OP.I64_DIV_U           = 0x80] = "i64.div_u";
OP[OP.I64_REM_S           = 0x81] = "i64.rem_s";
OP[OP.I64_REM_U           = 0x82] = "i64.rem_u";
OP[OP.I64_AND             = 0x83] = "i64.and";
OP[OP.I64_OR              = 0x84] = "i64.or";
OP[OP.I64_XOR             = 0x85] = "i64.xor";
OP[OP.I64_SHL             = 0x86] = "i64.shl";
OP[OP.I64_SHR_S           = 0x87] = "i64.shr_s";
OP[OP.I64_SHR_U           = 0x88] = "i64.shr_u";
OP[OP.I64_ROTL            = 0x89] = "i64.rotl";
OP[OP.I64_ROTR            = 0x8A] = "i64.rotr";
OP[OP.F32_ABS             = 0x8B] = "f32.abs";
OP[OP.F32_NEG             = 0x8C] = "f32.neg";
OP[OP.F32_CEIL            = 0x8D] = "f32.ceil";
OP[OP.F32_FLOOR           = 0x8E] = "f32.floor";
OP[OP.F32_TRUNC           = 0x8F] = "f32.trunc";
OP[OP.F32_NEAREST         = 0x90] = "f32.nearest";
OP[OP.F32_SQRT            = 0x91] = "f32.sqrt";
OP[OP.F32_ADD             = 0x92] = "f32.add";
OP[OP.F32_SUB             = 0x93] = "f32.sub";
OP[OP.F32_MUL             = 0x94] = "f32.mul";
OP[OP.F32_DIV             = 0x95] = "f32.div";
OP[OP.F32_MIN             = 0x96] = "f32.min";
OP[OP.F32_MAX             = 0x97] = "f32.max";
OP[OP.F32_COPYSIGN        = 0x98] = "f32.copysign";
OP[OP.F64_ABS             = 0x99] = "f64.abs";
OP[OP.F64_NEG             = 0x9A] = "f64.neg";
OP[OP.F64_CEIL            = 0x9B] = "f64.ceil";
OP[OP.F64_FLOOR           = 0x9C] = "f64.floor";
OP[OP.F64_TRUNC           = 0x9D] = "f64.trunc";
OP[OP.F64_NEAREST         = 0x9E] = "f64.nearest";
OP[OP.F64_SQRT            = 0x9F] = "f64.sqrt";
OP[OP.F64_ADD             = 0xA0] = "f64.add";
OP[OP.F64_SUB             = 0xA1] = "f64.sub";
OP[OP.F64_MUL             = 0xA2] = "f64.mul";
OP[OP.F64_DIV             = 0xA3] = "f64.div";
OP[OP.F64_MIN             = 0xA4] = "f64.min";
OP[OP.F64_MAX             = 0xA5] = "f64.max";
OP[OP.F64_COPYSIGN        = 0xA6] = "f64.copysign";
OP[OP.I32_WRAP_I64        = 0xA7] = "i32.wrap_i64";
OP[OP.I32_TRUNC_S_F32     = 0xA8] = "i32.trunc_s_f32";
OP[OP.I32_TRUNC_U_F32     = 0xA9] = "i32.trunc_u_f32";
OP[OP.I32_TRUNC_S_F64     = 0xAA] = "i32.trunc_s_f64";
OP[OP.I32_TRUNC_U_F64     = 0xAB] = "i32.trunc_u_f64";
OP[OP.I64_EXTEND_S_I32    = 0xAC] = "i64.extend_s_i32";
OP[OP.I64_EXTEND_U_I32    = 0xAD] = "i64.extend_u_i32";
OP[OP.I64_TRUNC_S_F32     = 0xAE] = "i64.trunc_s_f32";
OP[OP.I64_TRUNC_U_F32     = 0xAF] = "i64.trunc_u_f32";
OP[OP.I64_TRUNC_S_F64     = 0xB0] = "i64.trunc_s_f64";
OP[OP.I64_TRUNC_U_F64     = 0xB1] = "i64.trunc_u_f64";
OP[OP.F32_CONVERT_S_I32   = 0xB2] = "f32.convert_s_i32";
OP[OP.F32_CONVERT_U_I32   = 0xB3] = "f32.convert_u_i32";
OP[OP.F32_CONVERT_S_I64   = 0xB4] = "f32.convert_s_i64";
OP[OP.F32_CONVERT_U_I64   = 0xB5] = "f32.convert_u_i64";
OP[OP.F32_DEMOTE_F64      = 0xB6] = "f32.demote_f64";
OP[OP.F64_CONVERT_S_I32   = 0xB7] = "f64.convert_s_i32";
OP[OP.F64_CONVERT_U_I32   = 0xB8] = "f64.convert_u_i32";
OP[OP.F64_CONVERT_S_I64   = 0xB9] = "f64.convert_s_i64";
OP[OP.F64_CONVERT_U_I64   = 0xBA] = "f64.convert_u_i64";
OP[OP.F64_PROMOTE_F32     = 0xBB] = "f64.promote_f32";
OP[OP.I32_REINTERPRET_F32 = 0xBC] = "i32.reinterpret_f32";
OP[OP.I64_REINTERPRET_F64 = 0xBD] = "i64.reinterpret_f64";
OP[OP.F32_REINTERPRET_I32 = 0xBE] = "f32.reinterpret_i32";
OP[OP.F64_REINTERPRET_I64 = 0xBF] = "f64.reinterpret_i64";
OP[OP.I32_EXTEND8_S       = 0xC0] = "i32.extend8_s";
OP[OP.I32_EXTEND16_S      = 0xC1] = "i32.extend16_s";
OP[OP.I64_EXTEND8_S       = 0xC2] = "i64.extend8_s";
OP[OP.I64_EXTEND16_S      = 0xC3] = "i64.extend16_s";
OP[OP.I64_EXTEND32_S      = 0xC4] = "i64.extend32_s";

class Instruction {
    static readFrom(reader) {
        const opcode = reader.uint8();
        const immediates = {};

        switch (opcode) {
            case OP.BLOCK:
            case OP.LOOP:
            case OP.IF:
                immediates.signature = VALUE_TYPE[reader.uint8()];
                break;
            case OP.BR:
            case OP.BR_IF:
                immediates.depth = reader.vu32()
                break;
            case OP.BR_TABLE:
                immediates.depthTable = reader.array(() => reader.vu32());
                immediates.defaultDepth = reader.vu32();
                break;
            case OP.CALL:
                immediates.callee = reader.vu32();
                break;
            case OP.CALL_INDIRECT:
                immediates.signatureIndex = reader.vu32();
                immediates.reserved = reader.uint8();
                break;
            case OP.GET_LOCAL:
            case OP.SET_LOCAL:
            case OP.TEE_LOCAL:
            case OP.GET_GLOBAL:
            case OP.SET_GLOBAL:
                immediates.id = reader.vu32();
                break;
            case OP.I32_LOAD:
            case OP.I64_LOAD:
            case OP.F32_LOAD:
            case OP.F64_LOAD:
            case OP.I32_LOAD8_S:
            case OP.I32_LOAD8_U:
            case OP.I32_LOAD16_S:
            case OP.I32_LOAD16_U:
            case OP.I64_LOAD8_S:
            case OP.I64_LOAD8_U:
            case OP.I64_LOAD16_S:
            case OP.I64_LOAD16_U:
            case OP.I64_LOAD32_S:
            case OP.I64_LOAD32_U:
            case OP.I32_STORE:
            case OP.I64_STORE:
            case OP.F32_STORE:
            case OP.F64_STORE:
            case OP.I32_STORE8:
            case OP.I32_STORE16:
            case OP.I64_STORE8:
            case OP.I64_STORE16:
            case OP.I64_STORE32:
                immediates.align = reader.vu32();
                immediates.offset = reader.vu32();
                break;
            case OP.MEMORY_SIZE:
            case OP.MEMORY_GROW:
                immediates.reserved = reader.uint8();
                break;
            case OP.I32_CONST:
                immediates.value = reader.vs32();
                break;
            case OP.I64_CONST:
                immediates.value = reader.vs64();
                break;
            case OP.F32_CONST:
                immediates.value = reader.float()
                break;
            case OP.F64_CONST:
                immediates.value = reader.double();
                break;
            default:
                if (typeof OP[opcode] !== "string") return reader.reject("Unsupported opcode");
        }

        return new Instruction(opcode, immediates);
    }

    constructor(opcode, immediates) {
        this.opcode = opcode;
        this.opstr = OP[opcode];
        
        this.immediates = immediates;
    }
}

const convo   = new ArrayBuffer(8);
const u8      = new Uint8Array(convo);
const f32     = new Float32Array(convo);
const f64     = new Float64Array(convo);
const decoder = new TextDecoder();

class Reader {
    static endianSwap(int) {
        return (((int & 0xFF) << 24) |
            ((int & 0xFF00) << 8) |
            ((int >> 8) & 0xFF00) |
            ((int >> 24) & 0xFF));
    }

    constructor(buffer) {
        this.buffer = new Uint8Array(buffer);
       
        this._at = 0;
        this._previous = 0;
    }

    get at() {
        return this._at;
    }

    set at(at) {
        this._previous = this._at;
        this._at = at;
    }

    uint8() {
        return this.buffer[this.at++];
    }

    uint16() {
        return this.buffer[this._at] | (this.buffer[(this.at += 2) - 1] << 8)
    }

    uint32() {
        return this.buffer[this._at] | (this.buffer[this._at + 1] << 8) | (this.buffer[this._at + 2] << 16) | (this.buffer[(this.at += 4) - 1] << 24)
    }

    int32() {
        return this.u32() | 0;
    }

    float() {
        u8.set(this.buffer.subarray(this._at, this.at += 4));
        return f32[0];
    }

    double() {
        u8.set(this.buffer.subarray(this._at, this.at += 8));
        return f64[0];
    }

    bool() {
        return (this.buffer[this.at++] & 0x1) === 1
    }

    // LEB128s
    vu32() {
        let i = 0;
        let out = 0;
        while (this.buffer[this._at] & 0x80) {
            out |= (this.buffer[this.at++] & 0x7F) << i;
            i += 7;
        }
        out |= (this.buffer[this.at++] & 0x7F) << i;

        return out;
    }
    vs32() {
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

            return out
          }
        }
    }

    vu64() {
        let i = 0n;
        let out = 0n;
        while (this.buffer[this._at] & 0x80) {
            out |= BigInt(this.buffer[this.at++] & 0x7F) << i;
            i += 7n;
        }
        out |= BigInt(this.buffer[this.at++] & 0x7F) << i;

        return out;
    }

    vs64() {
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

            return out
          }
        }
    }

    byteArray(length = this.vu32()) {// Elements are bytes
        return this.buffer.subarray(this._at, this.at += length);
    }

    array(readFunc, length = this.vu32()) {// Elements are read by readFunc
        const out = Array(length);

        for (let i = 0; i < length; ++i) out[i] = readFunc.call(this, i);

        return out;
    }

    string(length = this.vu32()) {// Elements are characters
        return decoder.decode(this.buffer.subarray(this._at, this.at += length));
    }

    readInstruction() {
        return Instruction.readFrom(this);
    }

    readInitializer() {
        const instruction = this.readInstruction();

        // All instantiations end with an ending op
        if (instruction.opcode === OP.END) return null;

        if (this.readInstruction().opcode !== OP.END) return this.reject('Expected end instruction to terminate instantiation time initializor');

        return instruction;
    }

    reject(msg, buffer="wasm") {
        const hexOffset = this._previous.toString(16);
        const displayOffset = hexOffset.padStart(hexOffset.length + (hexOffset.length % 2), "0");

        throw new SyntaxError(`${msg} <@${displayOffset} ${buffer}>`)
    }
}

const KNOWN_CUSTOMS = ['name'];

function parseCustomSection(sectionName, bytes) {
    if (!KNOWN_CUSTOMS.includes(sectionName)) throw new Error("Unknown Custom Section");

    const reader = new Reader(bytes);

    switch (sectionName) {
        case "name": {
            const nameData = []

            while (reader._at < reader.buffer.byteLength) {
                const subSection = {}
                
                subSection.id = reader.uint8();
                subSection.size = reader.vu32();

                switch (subSection.id) {
                    case NAME_SUBSECTION.MODULE:
                        subSection.kind = "module";
                        subSection.value = reader.string();
                        break;
                    case NAME_SUBSECTION.FUNCTION:
                        subSection.kind = "function";
                        subSection.value = reader.array(() => {
                            const index = reader.vu32();
                            const name = reader.string();

                            return {
                                index,
                                name
                            }
                        });
                        break;
                    case NAME_SUBSECTION.LOCAL:
                        subSection.kind = "local";
                        
                        subSection.value = reader.array(() => {
                            const index = reader.vu32();
                            const locals = reader.array(() => {
                                const id = reader.vu32();
                                const name = reader.string();

                                return {
                                    id,
                                    name
                                }
                            });

                            return {
                                index,
                                locals
                            }
                        });
                        break;
                    default:
                        return reader.reject("Invalid subsection", "custom:name");
                }
                
                nameData.push(subSection);
            }

            return nameData
        }
        default:
            throw new Error("Unknown Custom Section")
    }
}

const defaultOptions = {
    multiResult: true,
    sharedMemory: true,
    mutableGlobals: true,
    sections: [SECTION.CUSTOM, SECTION.SIGNATURE, SECTION.IMPORT, SECTION.FUNCTION, SECTION.TABLE, SECTION.MEMORY, SECTION.GLOBAL, SECTION.EXPORT, SECTION.START, SECTION.ELEMENT, SECTION.CODE, SECTION.DATA],
    parseCustoms: false
};

function parseWASM(buffer, options=defaultOptions) {
    Object.entries(defaultOptions).forEach(([key, defaultValue]) => {
        if (!options.hasOwnProperty(key)) options[key] = defaultValue;
    });

    const reader = new Reader(buffer);
    
    const magic = Reader.endianSwap(reader.uint32())
    if (magic !== 0x0061736D) return reader.reject("Invalid magic");

    const version = reader.uint32();
    if (version !== 1) return reader.reject('Unsupported version');

    const sections = {
        customs: {},
        signature: null,
        import: null,
        function: null,
        table: null,
        memory: null,
        global: null,
        export: null,
        start: null,
        element: null,
        code: null,
        data: null,
    }
    
    let lastSection = -1;

    while (reader._at < reader.buffer.byteLength) {
        const id = reader.uint8();

        if (id !== SECTION.CUSTOM && lastSection >= id) return reader.reject(`Section 0x${id.toString(16).padStart(2, "0")} following 0x${lastSection.toString(16).padStart(2, "0")} out of order`);
        lastSection = id;

        if (id > MAX_SECTION_ID) return reader.reject("Invalid section");

        const size = reader.vu32();

        if (!options.sections.includes(id)) {
            reader.at += size;

            continue;
        }

        switch (id) {
            case SECTION.CUSTOM: {
                const start = reader._at;

                const name = reader.string();

                const sectionBytes = reader.byteArray(size - (reader._at - start));

                // Reallocate to prevent modification
                if (!options.parseCustoms || !KNOWN_CUSTOMS.includes(name)) {
                    sections.customs[name] = sectionBytes.slice(0);
                } else {
                    try {
                        sections.customs[name] = parseCustomSection(name, sectionBytes);
                    } catch {
                        sections.customs[name] = sectionBytes.slice(0);
                    }
                }
                break;
            }
            case SECTION.SIGNATURE: {
                sections.signature = reader.array((index) => {
                    const signature = {};
                    signature.index = index;

                    const form = reader.uint8();
                    if (form !== VALUE_TYPE.FUNC) return reader.reject('Invalid form ' + VALUE_TYPE[form]);
        
                    signature.params = reader.array(() => {
                        const valueType = reader.uint8();

                        if (!VARIABLE_TYPES.includes(valueType)) return reader.reject('Invalid parameter type ' + VALUE_TYPE[valueType]);

                        return VALUE_TYPE[valueType];
                    });
        
                    // Length of results should always be one or zero, unless multiple results is allowed
                    if (reader.buffer[reader._at] > 1 && !options.multiResult) return reader.reject('Multiple results are unsupported by current options');
        
                    signature.results = reader.array(() => {
                        const valueType = reader.uint8();

                        if (!VARIABLE_TYPES.includes(valueType)) return reader.reject('Invalid result type ' + VALUE_TYPE[valueType]);

                        return VALUE_TYPE[valueType];
                    });
        
                    return signature;
                });
                break;
            }
            case SECTION.IMPORT: {
                sections.import = reader.array(() => {
                    const importDef = {}
                    
                    importDef.moduleName = reader.string();
                    importDef.exportName = reader.string();
        
                    switch (reader.uint8()) {
                        case KIND.FUNC: {
                            importDef.kind = "func";
                            importDef.signatureIndex = reader.vu32();
                            break;
                        }
                        case KIND.TABLE: {
                            importDef.kind = "table";

                            const valueType = reader.uint8();

                            if (valueType !== VALUE_TYPE.FUNC_REF) return reader.reject('Invalid table element type ' + VALUE_TYPE[valueType]);

                            importDef.elementType = VALUE_TYPE[valueType];

                            const flags = reader.vu32();

                            importDef.initial = reader.vu32();

                            if (flags & 1) {
                                importDef.maximum = reader.vu32();

                                if (importDef.initial > importDef.maximum) return reader.reject('Resizable limit initial must be less than maximum');
                            }
                            break;
                        }
                        case KIND.MEMORY: {
                            importDef.kind = "memory";

                            const flags = reader.vu32();
                            
                            importDef.initial = reader.vu32();
        
                            if (flags & 1) {
                                importDef.maximum = reader.vu32();

                                if (importDef.initial > importDef.maximum) return reader.reject('Resizable limit initial must be less than maximum');
                            }

                            if (flags & 2) {
                                if (!options.sharedMemory) return reader.reject('Shared memory is unsupported by current options')

                                importDef.shared = true;
                            } else importDef.shared = false;
                            break;
                        }
                        case KIND.GLOBAL: {
                            importDef.kind = "global";

                            const valueType = reader.uint8();

                            if (!VARIABLE_TYPES.includes(valueType)) return reader.reject('Invalid global type ' + VALUE_TYPE[valueType]);

                            importDef.type = VALUE_TYPE[valueType];

                            const flags = reader.vu32();
                            
                            if (flags & 1) {
                                if (!options.mutableGlobals) return reader.reject('Mutable globals are unsupported by current options');

                                importDef.mutable = true;
                            } else importDef.mutable = false;
                            break;
                        }
                        default:
                            return reader.reject('Invalid import type')
        
                    }
        
                    return importDef
                });
                break;
            }
            case SECTION.FUNCTION: {
                sections.function = reader.array(() => {
                    const wasmFunction = {}
                    
                    wasmFunction.signatureIndex = reader.vu32();
                    
                    return wasmFunction;
                });
                break;
            }
            case SECTION.TABLE: {
                sections.table = reader.array(() => {
                    const table = {}
                    
                    const valueType = reader.uint8();
        
                    if (valueType !== VALUE_TYPE.FUNC_REF) return reader.reject('Invalid table element type ' + VALUE_TYPE[valueType]);

                    table.elementType = "funcref";

                    const flags = reader.vu32();

                    table.initial = reader.vu32();

                    if (flags & 1) {
                        table.maximum = reader.vu32();

                        if (table.initial > table.maximum) return reader.reject('Resizable limit initial must be less than maximum');
                    }
        
                    return table;
                });
                break;
            }
            case SECTION.MEMORY: {
                sections.memory = reader.array(() => {
                    const memory = {};
                    const flags = reader.vu32();

                    memory.initial = reader.vu32();
        
                    if (flags & 1) {
                        memory.maximum = reader.vu32();

                        if (memory.initial > memory.maximum) return reader.reject('Resizable limit initial must be less than maximum');
                    }

                    if (flags & 2) {
                        if (!options.sharedMemory) return reader.reject('Shared memory is unsupported by current options')

                        memory.shared = true;
                    } else memory.shared = false;

                    return memory;
                });
        
                break;
            }
            case SECTION.GLOBAL: {
                sections.global = reader.array(() => {
                    const global = {};

                    const valueType = reader.uint8();

                    if (!VARIABLE_TYPES.includes(valueType)) return reader.reject('Invalid global type ' + VALUE_TYPE[valueType]);

                    global.type = VALUE_TYPE[valueType];

                    const flags = reader.vu32();

                    if (flags & 1) {
                        if (!options.mutableGlobals) return reader.reject('Mutable globals are unsupported by current options');

                        global.mutable = true;
                    } else global.mutable = false; 
                    
                    global.initializer = reader.readInitializer();

                    return global;
                });
                break;
            }
            case SECTION.EXPORT: {
                sections.export = reader.array(() => {
                    const wasmExport = {};

                    wasmExport.name = reader.string();
                    wasmExport.kind = KIND[reader.uint8()];
                    wasmExport.index = reader.vu32();

                    return wasmExport;
                });
                break;
            }
            case SECTION.START: {
                sections.start = {
                    index: reader.vu32()
                }
                break;
            }
            case SECTION.ELEMENT: {
                sections.element = reader.array(() => {
                    const wasmElement = {};
                    
                    wasmElement.index = reader.vu32();
                    wasmElement.offset = reader.readInitializer();
                    wasmElement.elems = reader.array(() => reader.vu32());

                    return wasmElement;
                });
                break;
            }
            case SECTION.CODE: {
                sections.code = reader.array(() => {
                    const codeBody = {};
                    const bodyEnd = reader.vu32() + reader._at;
        
                    codeBody.locals = reader.array(() => {
                        const len = reader.vu32();
                        const valueType = reader.uint8();

                        if (!VARIABLE_TYPES.includes(valueType)) return reader.reject('Invalid local type ' + VALUE_TYPE[valueType]);

                        return Array(len).fill(VALUE_TYPE[valueType]);
                    }).flat();
        
                    const instructions = [];
        
                    while (reader._at < bodyEnd) {
                        instructions.push(reader.readInstruction());
                    };
        
                    if (!instructions[instructions.length - 1]) return reader.reject('No function body');
                    if (instructions[instructions.length - 1].opcode !== OP.END) return reader.reject('Expected end opcode to terminate instruction array');
                    
                    codeBody.instructions = instructions;
                    
                    return codeBody;
                });
                break;
            }
            case SECTION.DATA: {
                sections.data = reader.array(() => {
                    const data = {};

                    data.index = reader.vu32(); // memory specified
                    data.offset = reader.readInitializer();
                    data.data = reader.byteArray().slice(0);

                    return data;
                });
                break;
            }
            default: // this shouldn't run due to the earlier check... but its here anyway
                return reader.reject("Invalid section");
        }
    }

    return {
        version,
        sections
    };
}

const WASMParser = {
    OP,
    SECTION,
    Reader,
    Instruction,
    parseWASM
}

if (typeof window !== "undefined") window.WASMParser = WASMParser;
else if (typeof module !== "undefined") module.exports = WASMParser;
else globalThis.WASMParser = WASMParser;
