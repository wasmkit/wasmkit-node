"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WasmParser = exports.WasmModule = exports.WasmReader = exports.SectionOrder = exports.DataSegmentMode = exports.ElementKind = exports.ElementSegmentMode = exports.SectionId = exports.TerminatingEndInstruction = exports.Opstring = exports.Opcode = exports.ExternalType = exports.BlockType = exports.ValueType = exports.ReferenceType = exports.NumberType = void 0;
var NumberType;
(function (NumberType) {
    NumberType[NumberType["I32"] = -1] = "I32";
    NumberType[NumberType["I64"] = -2] = "I64";
    NumberType[NumberType["F32"] = -3] = "F32";
    NumberType[NumberType["F64"] = -4] = "F64";
})(NumberType = exports.NumberType || (exports.NumberType = {}));
var ReferenceType;
(function (ReferenceType) {
    ReferenceType[ReferenceType["FunctionReference"] = -16] = "FunctionReference";
    ReferenceType[ReferenceType["ExternalReference"] = -17] = "ExternalReference";
})(ReferenceType = exports.ReferenceType || (exports.ReferenceType = {}));
var ValueType;
(function (ValueType) {
    ValueType[ValueType["I32"] = -1] = "I32";
    ValueType[ValueType["I64"] = -2] = "I64";
    ValueType[ValueType["F32"] = -3] = "F32";
    ValueType[ValueType["F64"] = -4] = "F64";
    ValueType[ValueType["FunctionReference"] = -16] = "FunctionReference";
    ValueType[ValueType["ExternalReference"] = -17] = "ExternalReference";
})(ValueType = exports.ValueType || (exports.ValueType = {}));
var BlockType;
(function (BlockType) {
    BlockType[BlockType["I32"] = -1] = "I32";
    BlockType[BlockType["I64"] = -2] = "I64";
    BlockType[BlockType["F32"] = -3] = "F32";
    BlockType[BlockType["F64"] = -4] = "F64";
    BlockType[BlockType["FunctionReference"] = -16] = "FunctionReference";
    BlockType[BlockType["ExternalReference"] = -17] = "ExternalReference";
    BlockType[BlockType["Void"] = -64] = "Void";
})(BlockType = exports.BlockType || (exports.BlockType = {}));
var ExternalType;
(function (ExternalType) {
    ExternalType[ExternalType["Function"] = 0] = "Function";
    ExternalType[ExternalType["Table"] = 1] = "Table";
    ExternalType[ExternalType["Memory"] = 2] = "Memory";
    ExternalType[ExternalType["Global"] = 3] = "Global";
})(ExternalType = exports.ExternalType || (exports.ExternalType = {}));
var Opcode;
(function (Opcode) {
    Opcode[Opcode["Unreachable"] = 0] = "Unreachable";
    Opcode[Opcode["Nop"] = 1] = "Nop";
    Opcode[Opcode["Block"] = 2] = "Block";
    Opcode[Opcode["Loop"] = 3] = "Loop";
    Opcode[Opcode["If"] = 4] = "If";
    Opcode[Opcode["Else"] = 5] = "Else";
    Opcode[Opcode["End"] = 11] = "End";
    Opcode[Opcode["Br"] = 12] = "Br";
    Opcode[Opcode["BrIf"] = 13] = "BrIf";
    Opcode[Opcode["BrTable"] = 14] = "BrTable";
    Opcode[Opcode["Return"] = 15] = "Return";
    Opcode[Opcode["Call"] = 16] = "Call";
    Opcode[Opcode["CallIndirect"] = 17] = "CallIndirect";
    Opcode[Opcode["RefNull"] = 208] = "RefNull";
    Opcode[Opcode["RefIsNull"] = 209] = "RefIsNull";
    Opcode[Opcode["RefFunc"] = 210] = "RefFunc";
    Opcode[Opcode["Drop"] = 26] = "Drop";
    Opcode[Opcode["Select"] = 27] = "Select";
    Opcode[Opcode["SelectWithType"] = 28] = "SelectWithType";
    Opcode[Opcode["LocalGet"] = 32] = "LocalGet";
    Opcode[Opcode["LocalSet"] = 33] = "LocalSet";
    Opcode[Opcode["LocalTee"] = 34] = "LocalTee";
    Opcode[Opcode["GlobalGet"] = 35] = "GlobalGet";
    Opcode[Opcode["GlobalSet"] = 36] = "GlobalSet";
    Opcode[Opcode["TableGet"] = 37] = "TableGet";
    Opcode[Opcode["TableSet"] = 38] = "TableSet";
    Opcode[Opcode["TableInit"] = 64524] = "TableInit";
    Opcode[Opcode["ElemDrop"] = 64525] = "ElemDrop";
    Opcode[Opcode["TableCopy"] = 64526] = "TableCopy";
    Opcode[Opcode["TableGrow"] = 64527] = "TableGrow";
    Opcode[Opcode["TableSize"] = 64528] = "TableSize";
    Opcode[Opcode["TableFill"] = 64529] = "TableFill";
    Opcode[Opcode["I32Load"] = 40] = "I32Load";
    Opcode[Opcode["I64Load"] = 41] = "I64Load";
    Opcode[Opcode["F32Load"] = 42] = "F32Load";
    Opcode[Opcode["F64Load"] = 43] = "F64Load";
    Opcode[Opcode["I32Load8_S"] = 44] = "I32Load8_S";
    Opcode[Opcode["I32Load8_U"] = 45] = "I32Load8_U";
    Opcode[Opcode["I32Load16_S"] = 46] = "I32Load16_S";
    Opcode[Opcode["I32Load16_U"] = 47] = "I32Load16_U";
    Opcode[Opcode["I64Load8_S"] = 48] = "I64Load8_S";
    Opcode[Opcode["I64Load8_U"] = 49] = "I64Load8_U";
    Opcode[Opcode["I64Load16_S"] = 50] = "I64Load16_S";
    Opcode[Opcode["I64Load16_U"] = 51] = "I64Load16_U";
    Opcode[Opcode["I64Load32_S"] = 52] = "I64Load32_S";
    Opcode[Opcode["I64Load32_U"] = 53] = "I64Load32_U";
    Opcode[Opcode["I32Store"] = 54] = "I32Store";
    Opcode[Opcode["I64Store"] = 55] = "I64Store";
    Opcode[Opcode["F32Store"] = 56] = "F32Store";
    Opcode[Opcode["F64Store"] = 57] = "F64Store";
    Opcode[Opcode["I32Store8"] = 58] = "I32Store8";
    Opcode[Opcode["I32Store16"] = 59] = "I32Store16";
    Opcode[Opcode["I64Store8"] = 60] = "I64Store8";
    Opcode[Opcode["I64Store16"] = 61] = "I64Store16";
    Opcode[Opcode["I64Store32"] = 62] = "I64Store32";
    Opcode[Opcode["MemorySize"] = 63] = "MemorySize";
    Opcode[Opcode["MemoryGrow"] = 64] = "MemoryGrow";
    Opcode[Opcode["MemoryInit"] = 64520] = "MemoryInit";
    Opcode[Opcode["DataDrop"] = 64521] = "DataDrop";
    Opcode[Opcode["MemoryCopy"] = 64522] = "MemoryCopy";
    Opcode[Opcode["MemoryFill"] = 64523] = "MemoryFill";
    Opcode[Opcode["I32Const"] = 65] = "I32Const";
    Opcode[Opcode["I64Const"] = 66] = "I64Const";
    Opcode[Opcode["F32Const"] = 67] = "F32Const";
    Opcode[Opcode["F64Const"] = 68] = "F64Const";
    Opcode[Opcode["I32Eqz"] = 69] = "I32Eqz";
    Opcode[Opcode["I32Eq"] = 70] = "I32Eq";
    Opcode[Opcode["I32Ne"] = 71] = "I32Ne";
    Opcode[Opcode["I32Lt_S"] = 72] = "I32Lt_S";
    Opcode[Opcode["I32Lt_U"] = 73] = "I32Lt_U";
    Opcode[Opcode["I32Gt_S"] = 74] = "I32Gt_S";
    Opcode[Opcode["I32Gt_U"] = 75] = "I32Gt_U";
    Opcode[Opcode["I32Le_S"] = 76] = "I32Le_S";
    Opcode[Opcode["I32Le_U"] = 77] = "I32Le_U";
    Opcode[Opcode["I32Ge_S"] = 78] = "I32Ge_S";
    Opcode[Opcode["I32Ge_U"] = 79] = "I32Ge_U";
    Opcode[Opcode["I64Eqz"] = 80] = "I64Eqz";
    Opcode[Opcode["I64Eq"] = 81] = "I64Eq";
    Opcode[Opcode["I64_ne"] = 82] = "I64_ne";
    Opcode[Opcode["I64Lt_S"] = 83] = "I64Lt_S";
    Opcode[Opcode["I64Lt_U"] = 84] = "I64Lt_U";
    Opcode[Opcode["I64Gt_S"] = 85] = "I64Gt_S";
    Opcode[Opcode["I64Gt_U"] = 86] = "I64Gt_U";
    Opcode[Opcode["I64Le_S"] = 87] = "I64Le_S";
    Opcode[Opcode["I64Le_U"] = 88] = "I64Le_U";
    Opcode[Opcode["I64Ge_S"] = 89] = "I64Ge_S";
    Opcode[Opcode["I64Ge_U"] = 90] = "I64Ge_U";
    Opcode[Opcode["F32Eq"] = 91] = "F32Eq";
    Opcode[Opcode["F32Ne"] = 92] = "F32Ne";
    Opcode[Opcode["F32Lt"] = 93] = "F32Lt";
    Opcode[Opcode["F32Gt"] = 94] = "F32Gt";
    Opcode[Opcode["F32Le"] = 95] = "F32Le";
    Opcode[Opcode["F32Ge"] = 96] = "F32Ge";
    Opcode[Opcode["F64Eq"] = 97] = "F64Eq";
    Opcode[Opcode["F64Ne"] = 98] = "F64Ne";
    Opcode[Opcode["F64Lt"] = 99] = "F64Lt";
    Opcode[Opcode["F64Gt"] = 100] = "F64Gt";
    Opcode[Opcode["F64Le"] = 101] = "F64Le";
    Opcode[Opcode["F64Ge"] = 102] = "F64Ge";
    Opcode[Opcode["I32Clz"] = 103] = "I32Clz";
    Opcode[Opcode["I32Ctz"] = 104] = "I32Ctz";
    Opcode[Opcode["I32Popcnt"] = 105] = "I32Popcnt";
    Opcode[Opcode["I32Add"] = 106] = "I32Add";
    Opcode[Opcode["I32Sub"] = 107] = "I32Sub";
    Opcode[Opcode["I32Mul"] = 108] = "I32Mul";
    Opcode[Opcode["I32Div_S"] = 109] = "I32Div_S";
    Opcode[Opcode["I32Div_U"] = 110] = "I32Div_U";
    Opcode[Opcode["I32Rem_S"] = 111] = "I32Rem_S";
    Opcode[Opcode["I32Rem_U"] = 112] = "I32Rem_U";
    Opcode[Opcode["I32And"] = 113] = "I32And";
    Opcode[Opcode["I32Or"] = 114] = "I32Or";
    Opcode[Opcode["I32Xor"] = 115] = "I32Xor";
    Opcode[Opcode["I32Shl"] = 116] = "I32Shl";
    Opcode[Opcode["I32Shr_S"] = 117] = "I32Shr_S";
    Opcode[Opcode["I32Shr_U"] = 118] = "I32Shr_U";
    Opcode[Opcode["I32Rotl"] = 119] = "I32Rotl";
    Opcode[Opcode["I32Rotr"] = 120] = "I32Rotr";
    Opcode[Opcode["I64Clz"] = 121] = "I64Clz";
    Opcode[Opcode["I64Ctz"] = 122] = "I64Ctz";
    Opcode[Opcode["I64Popcnt"] = 123] = "I64Popcnt";
    Opcode[Opcode["I64Add"] = 124] = "I64Add";
    Opcode[Opcode["I64Sub"] = 125] = "I64Sub";
    Opcode[Opcode["I64Mul"] = 126] = "I64Mul";
    Opcode[Opcode["I64Div_S"] = 127] = "I64Div_S";
    Opcode[Opcode["I64Div_U"] = 128] = "I64Div_U";
    Opcode[Opcode["I64Rem_S"] = 129] = "I64Rem_S";
    Opcode[Opcode["I64Rem_U"] = 130] = "I64Rem_U";
    Opcode[Opcode["I64And"] = 131] = "I64And";
    Opcode[Opcode["I64Or"] = 132] = "I64Or";
    Opcode[Opcode["I64Xor"] = 133] = "I64Xor";
    Opcode[Opcode["I64Shl"] = 134] = "I64Shl";
    Opcode[Opcode["I64Shr_S"] = 135] = "I64Shr_S";
    Opcode[Opcode["I64Shr_U"] = 136] = "I64Shr_U";
    Opcode[Opcode["I64Rotl"] = 137] = "I64Rotl";
    Opcode[Opcode["I64Rotr"] = 138] = "I64Rotr";
    Opcode[Opcode["F32Abs"] = 139] = "F32Abs";
    Opcode[Opcode["F32Neg"] = 140] = "F32Neg";
    Opcode[Opcode["F32Ceil"] = 141] = "F32Ceil";
    Opcode[Opcode["F32Floor"] = 142] = "F32Floor";
    Opcode[Opcode["F32Trunc"] = 143] = "F32Trunc";
    Opcode[Opcode["F32Nearest"] = 144] = "F32Nearest";
    Opcode[Opcode["F32Sqrt"] = 145] = "F32Sqrt";
    Opcode[Opcode["F32Add"] = 146] = "F32Add";
    Opcode[Opcode["F32Sub"] = 147] = "F32Sub";
    Opcode[Opcode["F32Mul"] = 148] = "F32Mul";
    Opcode[Opcode["F32Div"] = 149] = "F32Div";
    Opcode[Opcode["F32Min"] = 150] = "F32Min";
    Opcode[Opcode["F32Max"] = 151] = "F32Max";
    Opcode[Opcode["F32Copysign"] = 152] = "F32Copysign";
    Opcode[Opcode["F64Abs"] = 153] = "F64Abs";
    Opcode[Opcode["F64Neg"] = 154] = "F64Neg";
    Opcode[Opcode["F64Ceil"] = 155] = "F64Ceil";
    Opcode[Opcode["F64Floor"] = 156] = "F64Floor";
    Opcode[Opcode["F64Trunc"] = 157] = "F64Trunc";
    Opcode[Opcode["F64Nearest"] = 158] = "F64Nearest";
    Opcode[Opcode["F64Sqrt"] = 159] = "F64Sqrt";
    Opcode[Opcode["F64Add"] = 160] = "F64Add";
    Opcode[Opcode["F64Sub"] = 161] = "F64Sub";
    Opcode[Opcode["F64Mul"] = 162] = "F64Mul";
    Opcode[Opcode["F64Div"] = 163] = "F64Div";
    Opcode[Opcode["F64Min"] = 164] = "F64Min";
    Opcode[Opcode["F64Max"] = 165] = "F64Max";
    Opcode[Opcode["F64Copysign"] = 166] = "F64Copysign";
    Opcode[Opcode["I32WrapI64"] = 167] = "I32WrapI64";
    Opcode[Opcode["I32TruncF32_S"] = 168] = "I32TruncF32_S";
    Opcode[Opcode["I32TruncF32_U"] = 169] = "I32TruncF32_U";
    Opcode[Opcode["I32TruncF64_S"] = 170] = "I32TruncF64_S";
    Opcode[Opcode["I32TruncF64_U"] = 171] = "I32TruncF64_U";
    Opcode[Opcode["I64ExtendI32_S"] = 172] = "I64ExtendI32_S";
    Opcode[Opcode["I64ExtendI32_U"] = 173] = "I64ExtendI32_U";
    Opcode[Opcode["I64TruncF32_S"] = 174] = "I64TruncF32_S";
    Opcode[Opcode["I64TruncF32_U"] = 175] = "I64TruncF32_U";
    Opcode[Opcode["I64TruncF64_S"] = 176] = "I64TruncF64_S";
    Opcode[Opcode["I64TruncF64_U"] = 177] = "I64TruncF64_U";
    Opcode[Opcode["F32ConvertI32_S"] = 178] = "F32ConvertI32_S";
    Opcode[Opcode["F32ConvertI32_U"] = 179] = "F32ConvertI32_U";
    Opcode[Opcode["F32ConvertI64_S"] = 180] = "F32ConvertI64_S";
    Opcode[Opcode["F32ConvertI64_U"] = 181] = "F32ConvertI64_U";
    Opcode[Opcode["F32DemoteF64"] = 182] = "F32DemoteF64";
    Opcode[Opcode["F64ConvertI32_S"] = 183] = "F64ConvertI32_S";
    Opcode[Opcode["F64ConvertI32_U"] = 184] = "F64ConvertI32_U";
    Opcode[Opcode["F64ConvertI64_S"] = 185] = "F64ConvertI64_S";
    Opcode[Opcode["F64ConvertI64_U"] = 186] = "F64ConvertI64_U";
    Opcode[Opcode["F64PromoteF32"] = 187] = "F64PromoteF32";
    Opcode[Opcode["I32ReinterpretF32"] = 188] = "I32ReinterpretF32";
    Opcode[Opcode["I64ReinterpretF64"] = 189] = "I64ReinterpretF64";
    Opcode[Opcode["F32ReinterpretF32"] = 190] = "F32ReinterpretF32";
    Opcode[Opcode["F64ReinterpretF64"] = 191] = "F64ReinterpretF64";
    Opcode[Opcode["I32Extend8_S"] = 192] = "I32Extend8_S";
    Opcode[Opcode["I32Extend16_S"] = 193] = "I32Extend16_S";
    Opcode[Opcode["I64Extend8_S"] = 194] = "I64Extend8_S";
    Opcode[Opcode["I64Extend16_S"] = 195] = "I64Extend16_S";
    Opcode[Opcode["I64Extend32_S"] = 196] = "I64Extend32_S";
    Opcode[Opcode["I32TruncSatF32_S"] = 64512] = "I32TruncSatF32_S";
    Opcode[Opcode["I32TruncSatF32_U"] = 64513] = "I32TruncSatF32_U";
    Opcode[Opcode["I32TruncSatF64_S"] = 64514] = "I32TruncSatF64_S";
    Opcode[Opcode["I32TruncSatF64_U"] = 64515] = "I32TruncSatF64_U";
    Opcode[Opcode["I64TruncSatF32_S"] = 64516] = "I64TruncSatF32_S";
    Opcode[Opcode["I64TruncSatF32_U"] = 64517] = "I64TruncSatF32_U";
    Opcode[Opcode["I64TruncSatF64_S"] = 64518] = "I64TruncSatF64_S";
    Opcode[Opcode["I64TruncSatF64_U"] = 64519] = "I64TruncSatF64_U";
})(Opcode = exports.Opcode || (exports.Opcode = {}));
exports.Opstring = {
    0x00: "unreachable",
    0x01: "nop",
    0x02: "block",
    0x03: "loop",
    0x04: "if",
    0x05: "else",
    0x0B: "end",
    0x0C: "br",
    0x0D: "br_if",
    0x0E: "br_table",
    0x0F: "return",
    0x10: "call",
    0x11: "call_indirect",
    0xD0: "ref.null",
    0xD1: "ref.is_null",
    0xD2: "ref.func",
    0x1A: "drop",
    0x1B: "select",
    0x1C: "select",
    0x20: "local.get",
    0x21: "local.set",
    0x22: "local.tee",
    0x23: "global.get",
    0x24: "global.set",
    0x25: "table.get",
    0x26: "table.set",
    64524: "table.init",
    64525: "elem.drop",
    64526: "table.copy",
    64527: "table.grow",
    64528: "table.size",
    64529: "table.fill",
    0x28: "i32.load",
    0x29: "i64.load",
    0x2A: "f32.load",
    0x2B: "f64.load",
    0x2C: "i32.load8_s",
    0x2D: "i32.load8_u",
    0x2E: "i32.load16_s",
    0x2F: "i32.load16_u",
    0x30: "i64.load8_s",
    0x31: "i64.load8_u",
    0x32: "i64.load16_s",
    0x33: "i64.load16_u",
    0x34: "i64.load32_s",
    0x35: "i64.load32_u",
    0x36: "i32.store",
    0x37: "i64.store",
    0x38: "f32.store",
    0x39: "f64.store",
    0x3A: "i32.store8",
    0x3B: "i32.store16",
    0x3C: "i64.store8",
    0x3D: "i64.store16",
    0x3E: "i64.store32",
    0x3F: "memory.size",
    0x40: "memory.grow",
    64520: "memory.init",
    64521: "data.drop",
    64522: "memory.copy",
    64523: "memory.fill",
    0x41: "i32.const",
    0x42: "i64.const",
    0x43: "f32.const",
    0x44: "f64.const",
    0x45: "i32.eqz",
    0x46: "i32.eq",
    0x47: "i32.ne",
    0x48: "i32.lt_s",
    0x49: "i32.lt_u",
    0x4A: "i32.gt_s",
    0x4B: "i32.gt_u",
    0x4C: "i32.le_s",
    0x4D: "i32.le_u",
    0x4E: "i32.ge_s",
    0x4F: "i32.ge_u",
    0x50: "i64.eqz",
    0x51: "i64.eq",
    0x52: "i64.ne",
    0x53: "i64.lt_s",
    0x54: "i64.lt_u",
    0x55: "i64.gt_s",
    0x56: "i64.gt_u",
    0x57: "i64.le_s",
    0x58: "i64.le_u",
    0x59: "i64.ge_s",
    0x5A: "i64.ge_u",
    0x5B: "f32.eq",
    0x5C: "f32.ne",
    0x5D: "f32.lt",
    0x5E: "f32.gt",
    0x5F: "f32.le",
    0x60: "f32.ge",
    0x61: "f64.eq",
    0x62: "f64.ne",
    0x63: "f64.lt",
    0x64: "f64.gt",
    0x65: "f64.le",
    0x66: "f64.ge",
    0x67: "i32.clz",
    0x68: "i32.ctz",
    0x69: "i32.popcnt",
    0x6A: "i32.add",
    0x6B: "i32.sub",
    0x6C: "i32.mul",
    0x6D: "i32.div_s",
    0x6E: "i32.div_u",
    0x6F: "i32.rem_s",
    0x70: "i32.rem_u",
    0x71: "i32.and",
    0x72: "i32.or",
    0x73: "i32.xor",
    0x74: "i32.shl",
    0x75: "i32.shr_s",
    0x76: "i32.shr_u",
    0x77: "i32.rotl",
    0x78: "i32.rotr",
    0x79: "i64.clz",
    0x7A: "i64.ctz",
    0x7B: "i64.popcnt",
    0x7C: "i64.add",
    0x7D: "i64.sub",
    0x7E: "i64.mul",
    0x7F: "i64.div_s",
    0x80: "i64.div_u",
    0x81: "i64.rem_s",
    0x82: "i64.rem_u",
    0x83: "i64.and",
    0x84: "i64.or",
    0x85: "i64.xor",
    0x86: "i64.shl",
    0x87: "i64.shr_s",
    0x88: "i64.shr_u",
    0x89: "i64.rotl",
    0x8A: "i64.rotr",
    0x8B: "f32.abs",
    0x8C: "f32.neg",
    0x8D: "f32.ceil",
    0x8E: "f32.floor",
    0x8F: "f32.trunc",
    0x90: "f32.nearest",
    0x91: "f32.sqrt",
    0x92: "f32.add",
    0x93: "f32.sub",
    0x94: "f32.mul",
    0x95: "f32.div",
    0x96: "f32.min",
    0x97: "f32.max",
    0x98: "f32.copysign",
    0x99: "f64.abs",
    0x9A: "f64.neg",
    0x9B: "f64.ceil",
    0x9C: "f64.floor",
    0x9D: "f64.trunc",
    0x9E: "f64.nearest",
    0x9F: "f64.sqrt",
    0xA0: "f64.add",
    0xA1: "f64.sub",
    0xA2: "f64.mul",
    0xA3: "f64.div",
    0xA4: "f64.min",
    0xA5: "f64.max",
    0xA6: "f64.copysign",
    0xA7: "i32.wrap_i64",
    0xA8: "i32.trunc_f32_s",
    0xA9: "i32.trunc_f32_u",
    0xAA: "i32.trunc_f64_s",
    0xAB: "i32.trunc_f64_u",
    0xAC: "i64.extend_i32_s",
    0xAD: "i64.extend_i32_u",
    0xAE: "i64.trunc_f32_s",
    0xAF: "i64.trunc_f32_u",
    0xB0: "i64.trunc_f64_s",
    0xB1: "i64.trunc_f64_u",
    0xB2: "f32.convert_i32_s",
    0xB3: "f32.convert_i32_u",
    0xB4: "f32.convert_i64_s",
    0xB5: "f32.convert_i64_u",
    0xB6: "f32.demote_f64",
    0xB7: "f64.convert_i32_s",
    0xB8: "f64.convert_i32_u",
    0xB9: "f64.convert_i64_s",
    0xBA: "f64.convert_i64_u",
    0xBB: "f64.promote_f32",
    0xBC: "i32.reinterpret_f32",
    0xBD: "i64.reinterpret_f64",
    0xBE: "f32.reinterpret_i32",
    0xBF: "f64.reinterpret_i64",
    0xC0: "i32.extend8_s",
    0xC1: "i32.extend16_s",
    0xC2: "i64.extend8_s",
    0xC3: "i64.extend16_s",
    0xC4: "i64.extend32_s",
    64512: "i32.trunc_sat_f32_s",
    64513: "i32.trunc_sat_f32_u",
    64514: "i32.trunc_sat_f64_s",
    64515: "i32.trunc_sat_f64_u",
    64516: "i64.trunc_sat_f32_s",
    64517: "i64.trunc_sat_f32_u",
    64518: "i64.trunc_sat_f64_s",
    64519: "i64.trunc_sat_f64_u",
};
const opcodePrefixes = [0xFC];
exports.TerminatingEndInstruction = {
    opcode: 11,
    opstring: exports.Opstring[11],
    immediates: {}
};
var SectionId;
(function (SectionId) {
    SectionId[SectionId["Custom"] = 0] = "Custom";
    SectionId[SectionId["Type"] = 1] = "Type";
    SectionId[SectionId["Import"] = 2] = "Import";
    SectionId[SectionId["Function"] = 3] = "Function";
    SectionId[SectionId["Table"] = 4] = "Table";
    SectionId[SectionId["Memory"] = 5] = "Memory";
    SectionId[SectionId["Global"] = 6] = "Global";
    SectionId[SectionId["Export"] = 7] = "Export";
    SectionId[SectionId["Start"] = 8] = "Start";
    SectionId[SectionId["Element"] = 9] = "Element";
    SectionId[SectionId["Code"] = 10] = "Code";
    SectionId[SectionId["Data"] = 11] = "Data";
    SectionId[SectionId["DataCount"] = 12] = "DataCount";
})(SectionId = exports.SectionId || (exports.SectionId = {}));
var ElementSegmentMode;
(function (ElementSegmentMode) {
    ElementSegmentMode[ElementSegmentMode["Active"] = 0] = "Active";
    ElementSegmentMode[ElementSegmentMode["Passive"] = 1] = "Passive";
    ElementSegmentMode[ElementSegmentMode["Declarative"] = 2] = "Declarative";
})(ElementSegmentMode = exports.ElementSegmentMode || (exports.ElementSegmentMode = {}));
var ElementKind;
(function (ElementKind) {
    ElementKind[ElementKind["FunctionReference"] = 0] = "FunctionReference";
})(ElementKind = exports.ElementKind || (exports.ElementKind = {}));
var DataSegmentMode;
(function (DataSegmentMode) {
    DataSegmentMode[DataSegmentMode["Active"] = 0] = "Active";
    DataSegmentMode[DataSegmentMode["Passive"] = 1] = "Passive";
    DataSegmentMode[DataSegmentMode["ActiveWithMemoryIndex"] = 2] = "ActiveWithMemoryIndex";
})(DataSegmentMode = exports.DataSegmentMode || (exports.DataSegmentMode = {}));
exports.SectionOrder = [1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    12,
    10,
    11];
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
        this.assert(typeof limits.max === 'undefined' || limits.max >= limits.min, "Limits maximum must be greater than or equal to minimum :: module malformed");
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
    readInstruction() {
        let opcode = this.readByte();
        if (opcodePrefixes.includes(opcode))
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
                immediates.memoryArgument = { align: this.readUint32(), offset: this.readUint32() };
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
            default:
                this.assert(exports.Opstring.hasOwnProperty(opcode), "Unsupported instruction");
        }
        return {
            opcode,
            opstring: exports.Opstring[opcode],
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
        return [...instructions, exports.TerminatingEndInstruction];
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
            type: -16
        };
        if ((modeFlags & 0b10) === 0b10)
            segment.tableIndex = this.readUint32();
        if (mode === 0)
            segment.offset = this.readInstructionExpression();
        if ((modeFlags & 0b11) !== 0)
            segment.type = this.readByte();
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
            functionBody: this.readInstructionExpression()
        };
        this.assert(this.at - start === size, "Size does not match function code's length :: module malformed");
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
exports.WasmReader = WasmReader;
class WasmModule {
    constructor(configuration) {
        this.types = [];
        this.functions = [];
        this.tables = [];
        this.memories = [];
        this.globals = [];
        this.elements = [];
        this.datas = [];
        this.start = null;
        this.imports = [];
        this.exports = [];
        this.types = configuration.types;
        this.functions = configuration.functions;
        this.tables = configuration.tables;
        this.memories = configuration.memories;
        this.globals = configuration.globals;
        this.elements = configuration.elements;
        this.datas = configuration.datas;
        this.start = configuration.start;
        this.imports = configuration.imports;
        this.exports = configuration.exports;
    }
    static decodeFrom(buffer) {
        const reader = new WasmReader(buffer);
        reader.assert((reader.readByte() << 24 |
            reader.readByte() << 16 |
            reader.readByte() << 8 |
            reader.readByte()) === 0x0061736D, 'Invalid magic :: module malformed');
        reader.assert((reader.readByte() |
            reader.readByte() << 8 |
            reader.readByte() << 16 |
            reader.readByte() << 24) === 1, 'Unsupported version');
        const readSectionIds = [];
        let typeRaw = [], importRaw = [], functionRaw = [], tableRaw = [], memoryRaw = [], globalRaw = [], exportRaw = [], startRaw = null, elementRaw = [], dataCount = null, codeRaw = [], dataRaw = [];
        let orderPos = -1;
        while (reader.inBuffer()) {
            const id = reader.readByte();
            const size = reader.readUint32();
            const start = reader.at;
            let newOrderPos = exports.SectionOrder.indexOf(id);
            reader.assert(!exports.SectionOrder.includes(id) || newOrderPos > orderPos, "Section " + id + " may not occur after " + exports.SectionOrder[orderPos]);
            orderPos = newOrderPos;
            if (id !== 0) {
                reader.assert(!readSectionIds.includes(id), "Section " + id + " may only occur once :: module malformed");
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
                    reader.assert(functionRaw && codeRaw.length === functionRaw.length, "For each function entry there should be a code entry, and vice versa :: module malformed");
                    break;
                case 11:
                    dataRaw = reader.readVector(reader.readDataEntry);
                    reader.assert(dataCount === null || dataRaw.length === dataCount, "Data entry count must be equal to predefined data count :: module malformed");
                    break;
                case 12:
                    dataCount = reader.readUint32();
                    break;
            }
            reader.assert(reader.at - start === size, "Size does not match section's length :: module malformed");
        }
        return new WasmModule({
            types: typeRaw,
            functions: codeRaw.map((code, index) => ({
                locals: code.locals,
                body: code.functionBody,
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
        });
    }
}
exports.WasmModule = WasmModule;
WasmModule.VERSION = "v1.0.3";
exports.WasmParser = WasmModule;
//# sourceMappingURL=parser.js.map