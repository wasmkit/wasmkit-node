"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WasmParser = exports.WasmModule = exports.WasmReader = exports.SectionOrder = exports.DataSegmentMode = exports.ElementKind = exports.ElementSegmentMode = exports.SectionName = exports.SectionId = exports.TerminatingEndInstruction = exports.Opstring = exports.Opcode = exports.ExternalTypeString = exports.ExternalType = exports.BlockTypeString = exports.BlockType = exports.ValueTypeString = exports.ValueType = exports.ReferenceTypeString = exports.ReferenceType = exports.VectorType = exports.NumberTypeString = exports.NumberType = void 0;
var NumberType;
(function (NumberType) {
    NumberType[NumberType["I32"] = -1] = "I32";
    NumberType[NumberType["I64"] = -2] = "I64";
    NumberType[NumberType["F32"] = -3] = "F32";
    NumberType[NumberType["F64"] = -4] = "F64";
})(NumberType = exports.NumberType || (exports.NumberType = {}));
exports.NumberTypeString = {
    [-1]: "i32",
    [-2]: "i64",
    [-3]: "f32",
    [-4]: "f64"
};
var VectorType;
(function (VectorType) {
    VectorType[VectorType["V128"] = 123] = "V128";
})(VectorType = exports.VectorType || (exports.VectorType = {}));
var ReferenceType;
(function (ReferenceType) {
    ReferenceType[ReferenceType["FunctionReference"] = -16] = "FunctionReference";
    ReferenceType[ReferenceType["ExternalReference"] = -17] = "ExternalReference";
})(ReferenceType = exports.ReferenceType || (exports.ReferenceType = {}));
exports.ReferenceTypeString = {
    [-16]: "funcref",
    [-17]: "externref"
};
var ValueType;
(function (ValueType) {
    ValueType[ValueType["I32"] = -1] = "I32";
    ValueType[ValueType["I64"] = -2] = "I64";
    ValueType[ValueType["F32"] = -3] = "F32";
    ValueType[ValueType["F64"] = -4] = "F64";
    ValueType[ValueType["FunctionReference"] = -16] = "FunctionReference";
    ValueType[ValueType["ExternalReference"] = -17] = "ExternalReference";
})(ValueType = exports.ValueType || (exports.ValueType = {}));
exports.ValueTypeString = {
    [-1]: exports.NumberTypeString[-1],
    [-2]: exports.NumberTypeString[-2],
    [-3]: exports.NumberTypeString[-3],
    [-4]: exports.NumberTypeString[-4],
    [-16]: exports.ReferenceTypeString[-16],
    [-17]: exports.ReferenceTypeString[-17]
};
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
exports.BlockTypeString = {
    [-1]: exports.NumberTypeString[-1],
    [-2]: exports.NumberTypeString[-2],
    [-3]: exports.NumberTypeString[-3],
    [-4]: exports.NumberTypeString[-4],
    [-16]: exports.ReferenceTypeString[-16],
    [-17]: exports.ReferenceTypeString[-17],
    [-64]: "void"
};
var ExternalType;
(function (ExternalType) {
    ExternalType[ExternalType["Function"] = 0] = "Function";
    ExternalType[ExternalType["Table"] = 1] = "Table";
    ExternalType[ExternalType["Memory"] = 2] = "Memory";
    ExternalType[ExternalType["Global"] = 3] = "Global";
})(ExternalType = exports.ExternalType || (exports.ExternalType = {}));
exports.ExternalTypeString = {
    [0]: "function",
    [1]: "table",
    [2]: "memory",
    [3]: "global"
};
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
    Opcode[Opcode["V128Load"] = 64768] = "V128Load";
    Opcode[Opcode["V128Load8x8_S"] = 64769] = "V128Load8x8_S";
    Opcode[Opcode["V128Load8x8_U"] = 64770] = "V128Load8x8_U";
    Opcode[Opcode["V128Load16x4_S"] = 64771] = "V128Load16x4_S";
    Opcode[Opcode["V128Load16x4_U"] = 64772] = "V128Load16x4_U";
    Opcode[Opcode["V128Load32x2_S"] = 64773] = "V128Load32x2_S";
    Opcode[Opcode["V128Load32x2_U"] = 64774] = "V128Load32x2_U";
    Opcode[Opcode["V128Load8Splat"] = 64775] = "V128Load8Splat";
    Opcode[Opcode["V128Load16Splat"] = 64776] = "V128Load16Splat";
    Opcode[Opcode["V128Load32Splat"] = 64777] = "V128Load32Splat";
    Opcode[Opcode["V128Load64Splat"] = 64778] = "V128Load64Splat";
    Opcode[Opcode["V128Load32Zero"] = 64860] = "V128Load32Zero";
    Opcode[Opcode["V128Load64Zero"] = 64861] = "V128Load64Zero";
    Opcode[Opcode["V128Store"] = 64779] = "V128Store";
    Opcode[Opcode["V128Load8Lane"] = 64852] = "V128Load8Lane";
    Opcode[Opcode["V128Load16Lane"] = 64853] = "V128Load16Lane";
    Opcode[Opcode["V128Load32Lane"] = 64854] = "V128Load32Lane";
    Opcode[Opcode["V128Load64Lane"] = 64855] = "V128Load64Lane";
    Opcode[Opcode["V128Store8Lane"] = 64856] = "V128Store8Lane";
    Opcode[Opcode["V128Store16Lane"] = 64857] = "V128Store16Lane";
    Opcode[Opcode["V128Store32Lane"] = 64858] = "V128Store32Lane";
    Opcode[Opcode["V128Store64Lane"] = 64859] = "V128Store64Lane";
    Opcode[Opcode["V128Const"] = 64780] = "V128Const";
    Opcode[Opcode["I8x16Shuffle"] = 64781] = "I8x16Shuffle";
    Opcode[Opcode["I8x16Swizzle"] = 64782] = "I8x16Swizzle";
    Opcode[Opcode["I8x16Splat"] = 64783] = "I8x16Splat";
    Opcode[Opcode["I16x8Splat"] = 64784] = "I16x8Splat";
    Opcode[Opcode["I32x4Splat"] = 64785] = "I32x4Splat";
    Opcode[Opcode["I64x2Splat"] = 64786] = "I64x2Splat";
    Opcode[Opcode["F32x4Splat"] = 64787] = "F32x4Splat";
    Opcode[Opcode["F64x2Splat"] = 64788] = "F64x2Splat";
    Opcode[Opcode["I8x16ExtractLane_S"] = 64789] = "I8x16ExtractLane_S";
    Opcode[Opcode["I8x16ExtractLane_U"] = 64790] = "I8x16ExtractLane_U";
    Opcode[Opcode["I8x16ReplaceLane"] = 64791] = "I8x16ReplaceLane";
    Opcode[Opcode["I16x8ExtractLane_S"] = 64792] = "I16x8ExtractLane_S";
    Opcode[Opcode["I16x8ExtractLane_U"] = 64793] = "I16x8ExtractLane_U";
    Opcode[Opcode["I16x8ReplaceLane"] = 64794] = "I16x8ReplaceLane";
    Opcode[Opcode["I32x4ExtractLane"] = 64795] = "I32x4ExtractLane";
    Opcode[Opcode["I32x4ReplaceLane"] = 64796] = "I32x4ReplaceLane";
    Opcode[Opcode["I64x2ExtractLane"] = 64797] = "I64x2ExtractLane";
    Opcode[Opcode["I64x2ReplaceLane"] = 64798] = "I64x2ReplaceLane";
    Opcode[Opcode["F32x4ExtractLane"] = 64799] = "F32x4ExtractLane";
    Opcode[Opcode["F32x4ReplaceLane"] = 64800] = "F32x4ReplaceLane";
    Opcode[Opcode["F64x2ExtractLane"] = 64801] = "F64x2ExtractLane";
    Opcode[Opcode["F64x2ReplaceLane"] = 64802] = "F64x2ReplaceLane";
    Opcode[Opcode["I8x16Eq"] = 64803] = "I8x16Eq";
    Opcode[Opcode["I8x16Ne"] = 64804] = "I8x16Ne";
    Opcode[Opcode["I8x16Lt_S"] = 64805] = "I8x16Lt_S";
    Opcode[Opcode["I8x16Lt_U"] = 64806] = "I8x16Lt_U";
    Opcode[Opcode["I8x16Gt_S"] = 64807] = "I8x16Gt_S";
    Opcode[Opcode["I8x16Gt_U"] = 64808] = "I8x16Gt_U";
    Opcode[Opcode["I8x16Le_S"] = 64809] = "I8x16Le_S";
    Opcode[Opcode["I8x16Le_U"] = 64810] = "I8x16Le_U";
    Opcode[Opcode["I8x16Ge_S"] = 64811] = "I8x16Ge_S";
    Opcode[Opcode["I8x16Ge_U"] = 64812] = "I8x16Ge_U";
    Opcode[Opcode["I16x8Eq"] = 64813] = "I16x8Eq";
    Opcode[Opcode["I16x8Ne"] = 64814] = "I16x8Ne";
    Opcode[Opcode["I16x8Lt_S"] = 64815] = "I16x8Lt_S";
    Opcode[Opcode["I16x8Lt_U"] = 64816] = "I16x8Lt_U";
    Opcode[Opcode["I16x8Gt_S"] = 64817] = "I16x8Gt_S";
    Opcode[Opcode["I16x8Gt_U"] = 64818] = "I16x8Gt_U";
    Opcode[Opcode["I16x8Le_S"] = 64819] = "I16x8Le_S";
    Opcode[Opcode["I16x8Le_U"] = 64820] = "I16x8Le_U";
    Opcode[Opcode["I16x8Ge_S"] = 64821] = "I16x8Ge_S";
    Opcode[Opcode["I16x8Ge_U"] = 64822] = "I16x8Ge_U";
    Opcode[Opcode["I32x4Eq"] = 64823] = "I32x4Eq";
    Opcode[Opcode["I32x4Ne"] = 64824] = "I32x4Ne";
    Opcode[Opcode["I32x4Lt_S"] = 64825] = "I32x4Lt_S";
    Opcode[Opcode["I32x4Lt_U"] = 64826] = "I32x4Lt_U";
    Opcode[Opcode["I32x4Gt_S"] = 64827] = "I32x4Gt_S";
    Opcode[Opcode["I32x4Gt_U"] = 64828] = "I32x4Gt_U";
    Opcode[Opcode["I32x4Le_S"] = 64829] = "I32x4Le_S";
    Opcode[Opcode["I32x4Le_U"] = 64830] = "I32x4Le_U";
    Opcode[Opcode["I32x4Ge_S"] = 64831] = "I32x4Ge_S";
    Opcode[Opcode["I32x4Ge_U"] = 64832] = "I32x4Ge_U";
    Opcode[Opcode["I64x2Eq"] = 64982] = "I64x2Eq";
    Opcode[Opcode["I64x2Ne"] = 64983] = "I64x2Ne";
    Opcode[Opcode["I64x2Lt_S"] = 64984] = "I64x2Lt_S";
    Opcode[Opcode["I64x2Gt_S"] = 64985] = "I64x2Gt_S";
    Opcode[Opcode["I64x2Le_S"] = 64986] = "I64x2Le_S";
    Opcode[Opcode["I64x2Ge_S"] = 64987] = "I64x2Ge_S";
    Opcode[Opcode["F32x4Eq"] = 64833] = "F32x4Eq";
    Opcode[Opcode["F32x4Ne"] = 64834] = "F32x4Ne";
    Opcode[Opcode["F32x4Lt"] = 64835] = "F32x4Lt";
    Opcode[Opcode["F32x4Gt"] = 64836] = "F32x4Gt";
    Opcode[Opcode["F32x4Le"] = 64837] = "F32x4Le";
    Opcode[Opcode["F32x4Ge"] = 64838] = "F32x4Ge";
    Opcode[Opcode["F64x2Eq"] = 64839] = "F64x2Eq";
    Opcode[Opcode["F64x2Ne"] = 64840] = "F64x2Ne";
    Opcode[Opcode["F64x2Lt"] = 64841] = "F64x2Lt";
    Opcode[Opcode["F64x2Gt"] = 64842] = "F64x2Gt";
    Opcode[Opcode["F64x2Le"] = 64843] = "F64x2Le";
    Opcode[Opcode["F64x2Ge"] = 64844] = "F64x2Ge";
    Opcode[Opcode["V128Not"] = 64845] = "V128Not";
    Opcode[Opcode["V128And"] = 64846] = "V128And";
    Opcode[Opcode["V128Andnot"] = 64847] = "V128Andnot";
    Opcode[Opcode["V128Or"] = 64848] = "V128Or";
    Opcode[Opcode["V128Xor"] = 64849] = "V128Xor";
    Opcode[Opcode["V128Bitselect"] = 64850] = "V128Bitselect";
    Opcode[Opcode["V128AnyTrue"] = 64851] = "V128AnyTrue";
    Opcode[Opcode["I8x16Abs"] = 64864] = "I8x16Abs";
    Opcode[Opcode["I8x16Neg"] = 64865] = "I8x16Neg";
    Opcode[Opcode["I8x16Popcnt"] = 64866] = "I8x16Popcnt";
    Opcode[Opcode["I8x16AllTrue"] = 64867] = "I8x16AllTrue";
    Opcode[Opcode["I8x16Bitmask"] = 64868] = "I8x16Bitmask";
    Opcode[Opcode["I8x16NarrowI16x8_S"] = 64869] = "I8x16NarrowI16x8_S";
    Opcode[Opcode["I8x16NarrowI16x8_U"] = 64870] = "I8x16NarrowI16x8_U";
    Opcode[Opcode["I8x16Shl"] = 64875] = "I8x16Shl";
    Opcode[Opcode["I8x16Shr_S"] = 64876] = "I8x16Shr_S";
    Opcode[Opcode["I8x16Shr_U"] = 64877] = "I8x16Shr_U";
    Opcode[Opcode["I8x16Add"] = 64878] = "I8x16Add";
    Opcode[Opcode["I8x16AddSat_S"] = 64879] = "I8x16AddSat_S";
    Opcode[Opcode["I8x16AddSat_U"] = 64880] = "I8x16AddSat_U";
    Opcode[Opcode["I8x16Sub"] = 64881] = "I8x16Sub";
    Opcode[Opcode["I8x16SubSat_S"] = 64882] = "I8x16SubSat_S";
    Opcode[Opcode["I8x16SubSat_U"] = 64883] = "I8x16SubSat_U";
    Opcode[Opcode["I8x16Min_S"] = 64886] = "I8x16Min_S";
    Opcode[Opcode["I8x16Min_U"] = 64887] = "I8x16Min_U";
    Opcode[Opcode["I8x16Max_S"] = 64888] = "I8x16Max_S";
    Opcode[Opcode["I8x16Max_U"] = 64889] = "I8x16Max_U";
    Opcode[Opcode["I8x16Avgr_U"] = 64891] = "I8x16Avgr_U";
    Opcode[Opcode["I16x8ExtaddPairwiseI8x16_S"] = 64892] = "I16x8ExtaddPairwiseI8x16_S";
    Opcode[Opcode["I16x8ExtaddPairwiseI8x16_U"] = 64893] = "I16x8ExtaddPairwiseI8x16_U";
    Opcode[Opcode["I16x8Abs"] = 64896] = "I16x8Abs";
    Opcode[Opcode["I16x8Neg"] = 64897] = "I16x8Neg";
    Opcode[Opcode["I16x8Q15mulrSat_S"] = 64898] = "I16x8Q15mulrSat_S";
    Opcode[Opcode["I16x8AllTrue"] = 64899] = "I16x8AllTrue";
    Opcode[Opcode["I16x8Bitmask"] = 64900] = "I16x8Bitmask";
    Opcode[Opcode["I16x8NarrowI32x4_S"] = 64901] = "I16x8NarrowI32x4_S";
    Opcode[Opcode["I16x8NarrowI32x4_U"] = 64902] = "I16x8NarrowI32x4_U";
    Opcode[Opcode["I16x8ExtendLowI8x16_S"] = 64903] = "I16x8ExtendLowI8x16_S";
    Opcode[Opcode["I16x8ExtendHighI8x16_S"] = 64904] = "I16x8ExtendHighI8x16_S";
    Opcode[Opcode["I16x8ExtendLowI8x16_U"] = 64905] = "I16x8ExtendLowI8x16_U";
    Opcode[Opcode["I16x8ExtendHighI8x16_U"] = 64906] = "I16x8ExtendHighI8x16_U";
    Opcode[Opcode["I16x8Shl"] = 64907] = "I16x8Shl";
    Opcode[Opcode["I16x8Shr_S"] = 64908] = "I16x8Shr_S";
    Opcode[Opcode["I16x8Shr_U"] = 64909] = "I16x8Shr_U";
    Opcode[Opcode["I16x8Add"] = 64910] = "I16x8Add";
    Opcode[Opcode["I16x8AddSat_S"] = 64911] = "I16x8AddSat_S";
    Opcode[Opcode["I16x8AddSat_U"] = 64912] = "I16x8AddSat_U";
    Opcode[Opcode["I16x8Sub"] = 64913] = "I16x8Sub";
    Opcode[Opcode["I16x8SubSat_S"] = 64914] = "I16x8SubSat_S";
    Opcode[Opcode["I16x8SubSat_U"] = 64915] = "I16x8SubSat_U";
    Opcode[Opcode["I16x8Mul"] = 64917] = "I16x8Mul";
    Opcode[Opcode["I16x8Min_S"] = 64918] = "I16x8Min_S";
    Opcode[Opcode["I16x8Min_U"] = 64919] = "I16x8Min_U";
    Opcode[Opcode["I16x8Max_S"] = 64920] = "I16x8Max_S";
    Opcode[Opcode["I16x8Max_U"] = 64921] = "I16x8Max_U";
    Opcode[Opcode["I16x8Avgr_U"] = 64923] = "I16x8Avgr_U";
    Opcode[Opcode["I16x8ExtmulLowI8x16_S"] = 64924] = "I16x8ExtmulLowI8x16_S";
    Opcode[Opcode["I16x8ExtmulHighI8x16_S"] = 64925] = "I16x8ExtmulHighI8x16_S";
    Opcode[Opcode["I16x8ExtmulLowI8x16_U"] = 64926] = "I16x8ExtmulLowI8x16_U";
    Opcode[Opcode["I16x8ExtmulHighI8x16_U"] = 64927] = "I16x8ExtmulHighI8x16_U";
    Opcode[Opcode["I32x4ExtaddPairwiseI16x8_S"] = 64894] = "I32x4ExtaddPairwiseI16x8_S";
    Opcode[Opcode["I32x4ExtaddPairwiseI16x8_U"] = 64895] = "I32x4ExtaddPairwiseI16x8_U";
    Opcode[Opcode["I32x4Abs"] = 64928] = "I32x4Abs";
    Opcode[Opcode["I32x4Neg"] = 64929] = "I32x4Neg";
    Opcode[Opcode["I32x4AllTrue"] = 64931] = "I32x4AllTrue";
    Opcode[Opcode["I32x4Bitmask"] = 64932] = "I32x4Bitmask";
    Opcode[Opcode["I32x4ExtendLowI16x8_S"] = 64935] = "I32x4ExtendLowI16x8_S";
    Opcode[Opcode["I32x4ExtendHighI16x8_S"] = 64936] = "I32x4ExtendHighI16x8_S";
    Opcode[Opcode["I32x4ExtendLowI16x8_U"] = 64937] = "I32x4ExtendLowI16x8_U";
    Opcode[Opcode["I32x4ExtendHighI16x8_U"] = 64938] = "I32x4ExtendHighI16x8_U";
    Opcode[Opcode["I32x4Shl"] = 64939] = "I32x4Shl";
    Opcode[Opcode["I32x4Shr_S"] = 64940] = "I32x4Shr_S";
    Opcode[Opcode["I32x4Shr_U"] = 64941] = "I32x4Shr_U";
    Opcode[Opcode["I32x4Add"] = 64942] = "I32x4Add";
    Opcode[Opcode["I32x4Sub"] = 64945] = "I32x4Sub";
    Opcode[Opcode["I32x4Mul"] = 64949] = "I32x4Mul";
    Opcode[Opcode["I32x4Min_S"] = 64950] = "I32x4Min_S";
    Opcode[Opcode["I32x4Min_U"] = 64951] = "I32x4Min_U";
    Opcode[Opcode["I32x4Max_S"] = 64952] = "I32x4Max_S";
    Opcode[Opcode["I32x4Max_U"] = 64953] = "I32x4Max_U";
    Opcode[Opcode["I32x4DotI16x8_S"] = 64954] = "I32x4DotI16x8_S";
    Opcode[Opcode["I32x4ExtmulLowI16x8_S"] = 64956] = "I32x4ExtmulLowI16x8_S";
    Opcode[Opcode["I32x4ExtmulHighI16x8_S"] = 64957] = "I32x4ExtmulHighI16x8_S";
    Opcode[Opcode["I32x4ExtmulLowI16x8_U"] = 64958] = "I32x4ExtmulLowI16x8_U";
    Opcode[Opcode["I32x4ExtmulHighI16x8_U"] = 64959] = "I32x4ExtmulHighI16x8_U";
    Opcode[Opcode["I64x2Abs"] = 64960] = "I64x2Abs";
    Opcode[Opcode["I64x2Neg"] = 64961] = "I64x2Neg";
    Opcode[Opcode["I64x2AllTrue"] = 64963] = "I64x2AllTrue";
    Opcode[Opcode["I64x2Bitmask"] = 64964] = "I64x2Bitmask";
    Opcode[Opcode["I64x2ExtendLowI32x4_S"] = 64967] = "I64x2ExtendLowI32x4_S";
    Opcode[Opcode["I64x2ExtendHighI32x4_S"] = 64968] = "I64x2ExtendHighI32x4_S";
    Opcode[Opcode["I64x2ExtendLowI32x4_U"] = 64969] = "I64x2ExtendLowI32x4_U";
    Opcode[Opcode["I64x2ExtendHighI32x4_U"] = 64970] = "I64x2ExtendHighI32x4_U";
    Opcode[Opcode["I64x2Shl"] = 64971] = "I64x2Shl";
    Opcode[Opcode["I64x2Shr_S"] = 64972] = "I64x2Shr_S";
    Opcode[Opcode["I64x2Shr_U"] = 64973] = "I64x2Shr_U";
    Opcode[Opcode["I64x2Add"] = 64974] = "I64x2Add";
    Opcode[Opcode["I64x2Sub"] = 64977] = "I64x2Sub";
    Opcode[Opcode["I64x2Mul"] = 64981] = "I64x2Mul";
    Opcode[Opcode["I64x2ExtmulLowI32x4_S"] = 64988] = "I64x2ExtmulLowI32x4_S";
    Opcode[Opcode["I64x2ExtmulHighI32x4_S"] = 64989] = "I64x2ExtmulHighI32x4_S";
    Opcode[Opcode["I64x2ExtmulLowI32x4_U"] = 64990] = "I64x2ExtmulLowI32x4_U";
    Opcode[Opcode["I64x2ExtmulHighI32x4_U"] = 64991] = "I64x2ExtmulHighI32x4_U";
    Opcode[Opcode["F32x4Ceil"] = 64871] = "F32x4Ceil";
    Opcode[Opcode["F32x4Floor"] = 64872] = "F32x4Floor";
    Opcode[Opcode["F32x4Trunc"] = 64873] = "F32x4Trunc";
    Opcode[Opcode["F32x4Nearest"] = 64874] = "F32x4Nearest";
    Opcode[Opcode["F32x4Abs"] = 64992] = "F32x4Abs";
    Opcode[Opcode["F32x4Neg"] = 64993] = "F32x4Neg";
    Opcode[Opcode["F32x4Sqrt"] = 64995] = "F32x4Sqrt";
    Opcode[Opcode["F32x4Add"] = 64996] = "F32x4Add";
    Opcode[Opcode["F32x4Sub"] = 64997] = "F32x4Sub";
    Opcode[Opcode["F32x4Mul"] = 64998] = "F32x4Mul";
    Opcode[Opcode["F32x4Div"] = 64999] = "F32x4Div";
    Opcode[Opcode["F32x4Min"] = 65000] = "F32x4Min";
    Opcode[Opcode["F32x4Max"] = 65001] = "F32x4Max";
    Opcode[Opcode["F32x4Pmin"] = 65002] = "F32x4Pmin";
    Opcode[Opcode["F32x4Pmax"] = 65003] = "F32x4Pmax";
    Opcode[Opcode["F64x2Ceil"] = 64884] = "F64x2Ceil";
    Opcode[Opcode["F64x2Floor"] = 64885] = "F64x2Floor";
    Opcode[Opcode["F64x2Trunc"] = 64890] = "F64x2Trunc";
    Opcode[Opcode["F64x2Nearest"] = 64916] = "F64x2Nearest";
    Opcode[Opcode["F64x2Abs"] = 65004] = "F64x2Abs";
    Opcode[Opcode["F64x2Neg"] = 65005] = "F64x2Neg";
    Opcode[Opcode["F64x2Sqrt"] = 65007] = "F64x2Sqrt";
    Opcode[Opcode["F64x2Add"] = 65008] = "F64x2Add";
    Opcode[Opcode["F64x2Sub"] = 65009] = "F64x2Sub";
    Opcode[Opcode["F64x2Mul"] = 65010] = "F64x2Mul";
    Opcode[Opcode["F64x2Div"] = 65011] = "F64x2Div";
    Opcode[Opcode["F64x2Min"] = 65012] = "F64x2Min";
    Opcode[Opcode["F64x2Max"] = 65013] = "F64x2Max";
    Opcode[Opcode["F64x2Pmin"] = 65014] = "F64x2Pmin";
    Opcode[Opcode["F64x2Pmax"] = 65015] = "F64x2Pmax";
    Opcode[Opcode["I32x4TruncSatF32x4_S"] = 65016] = "I32x4TruncSatF32x4_S";
    Opcode[Opcode["I32x4TruncSatF32x4_U"] = 65017] = "I32x4TruncSatF32x4_U";
    Opcode[Opcode["F32x4ConvertI32x4_S"] = 65018] = "F32x4ConvertI32x4_S";
    Opcode[Opcode["F32x4ConvertI32x4_U"] = 65019] = "F32x4ConvertI32x4_U";
    Opcode[Opcode["I32x4TruncSatF64x2_SZero"] = 65020] = "I32x4TruncSatF64x2_SZero";
    Opcode[Opcode["I32x4TruncSatF64x2_UZero"] = 65021] = "I32x4TruncSatF64x2_UZero";
    Opcode[Opcode["F64x2ConvertLowI32x4_S"] = 65022] = "F64x2ConvertLowI32x4_S";
    Opcode[Opcode["F64x2ConvertLowI32x4_U"] = 65023] = "F64x2ConvertLowI32x4_U";
    Opcode[Opcode["F32x4DemoteF64x2Zero"] = 64862] = "F32x4DemoteF64x2Zero";
    Opcode[Opcode["F64x2PromoteLowF32x4"] = 64863] = "F64x2PromoteLowF32x4";
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
    64768: "v128.load",
    64769: "v128.load8x8_s",
    64770: "v128.load8x8_u",
    64771: "v128.load16x4_s",
    64772: "v128.load16x4_u",
    64773: "v128.load32x2_s",
    64774: "v128.load32x2_u",
    64775: "v128.load8Splat",
    64776: "v128.load16Splat",
    64777: "v128.load32Splat",
    64778: "v128.load64Splat",
    64860: "v128.load32Zero",
    64861: "v128.load64Zero",
    64779: "v128.store",
    64852: "v128.load8_lane",
    64853: "v128.load16_lane",
    64854: "v128.load32_lane",
    64855: "v128.load64_lane",
    64856: "v128.store8_lane",
    64857: "v128.store16_lane",
    64858: "v128.store32_lane",
    64859: "v128.store64_lane",
    64780: "v128.const",
    64781: "i8x16.shuffle",
    64789: "i8x16.extract_lane_s",
    64790: "i8x16.extract_lane_u",
    64791: "i8x16.replace_lane",
    64792: "i16x8.extract_lane_s",
    64793: "i16x8.extract_lane_u",
    64794: "i16x8.replace_lane",
    64795: "i32x4.extract_lane",
    64796: "i32x4.replace_lane",
    64797: "i64x2.extract_lane",
    64798: "i64x2.replace_lane",
    64799: "f32x4.extract_lane",
    64800: "f32x4.replace_lane",
    64801: "f64x2.extract_lane",
    64802: "f64x2.replace_lane",
    64782: "i8x16.swizzle",
    64783: "i8x16.splat",
    64784: "i16x8.splat",
    64785: "i32x4.splat",
    64786: "i64x2.splat",
    64787: "f32x4.splat",
    64788: "f64x2.splat",
    64803: "i8x16.eq",
    64804: "i8x16.ne",
    64805: "i8x16.lt_s",
    64806: "i8x16.lt_u",
    64807: "i8x16.gt_s",
    64808: "i8x16.gt_u",
    64809: "i8x16.le_s",
    64810: "i8x16.le_u",
    64811: "i8x16.ge_s",
    64812: "i8x16.ge_u",
    64813: "i16x8.eq",
    64814: "i16x8.ne",
    64815: "i16x8.lt_s",
    64816: "i16x8.lt_u",
    64817: "i16x8.gt_s",
    64818: "i16x8.gt_u",
    64819: "i16x8.le_s",
    64820: "i16x8.le_u",
    64821: "i16x8.ge_s",
    64822: "i16x8.ge_u",
    64823: "i32x4.eq",
    64824: "i32x4.ne",
    64825: "i32x4.lt_s",
    64826: "i32x4.lt_u",
    64827: "i32x4.gt_s",
    64828: "i32x4.gt_u",
    64829: "i32x4.le_s",
    64830: "i32x4.le_u",
    64831: "i32x4.ge_s",
    64832: "i32x4.ge_u",
    64982: "i64x2.eq",
    64983: "i64x2.ne",
    64984: "i64x2.lt_s",
    64985: "i64x2.gt_s",
    64986: "i64x2.le_s",
    64987: "i64x2.ge_s",
    64833: "f32x4.eq",
    64834: "f32x4.ne",
    64835: "f32x4.lt",
    64836: "f32x4.gt",
    64837: "f32x4.le",
    64838: "f32x4.ge",
    64839: "f64x2.eq",
    64840: "f64x2.ne",
    64841: "f64x2.lt",
    64842: "f64x2.gt",
    64843: "f64x2.le",
    64844: "f64x2.ge",
    64845: "v128.not",
    64846: "v128.and",
    64847: "v128.andnot",
    64848: "v128.or",
    64849: "v128.xor",
    64850: "v128.bitselect",
    64851: "v128.any_true",
    64864: "i8x16.abs",
    64865: "i8x16.neg",
    64866: "i8x16.popcnt",
    64867: "i8x16.all_true",
    64868: "i8x16.bitmask",
    64869: "i8x16.narrow_i16x8_s",
    64870: "i8x16.narrow_i16x8_u",
    64875: "i8x16.shl",
    64876: "i8x16.shr_s",
    64877: "i8x16.shr_u",
    64878: "i8x16.add",
    64879: "i8x16.add_sat_s",
    64880: "i8x16.add_sat_u",
    64881: "i8x16.sub",
    64882: "i8x16.sub_sat_s",
    64883: "i8x16.sub_sat_u",
    64886: "i8x16.min_s",
    64887: "i8x16.min_u",
    64888: "i8x16.max_s",
    64889: "i8x16.max_u",
    64891: "i8x16.avgr_u",
    64892: "i16x8.extadd_pairwise_i8x16_s",
    64893: "i16x8.extadd_pairwise_i8x16_u",
    64896: "i16x8.abs",
    64897: "i16x8.neg",
    64898: "i16x8.q15mulr_sat_s",
    64899: "i16x8.all_true",
    64900: "i16x8.bitmask",
    64901: "i16x8.narrow_i32x4_s",
    64902: "i16x8.narrow_i32x4_u",
    64903: "i16x8.extend_low_i8x16_s",
    64904: "i16x8.extend_high_i8x16_s",
    64905: "i16x8.extend_low_i8x16_u",
    64906: "i16x8.extend_high_i8x16_u",
    64907: "i16x8.shl",
    64908: "i16x8.shr_s",
    64909: "i16x8.shr_u",
    64910: "i16x8.add",
    64911: "i16x8.add_sat_s",
    64912: "i16x8.add_sat_u",
    64913: "i16x8.sub",
    64914: "i16x8.sub_sat_s",
    64915: "i16x8.sub_sat_u",
    64917: "i16x8.mul",
    64918: "i16x8.min_s",
    64919: "i16x8.min_u",
    64920: "i16x8.max_s",
    64921: "i16x8.max_u",
    64923: "i16x8.avgr_u",
    64924: "i16x8.extmul_low_i8x16_s",
    64925: "i16x8.extmul_high_i8x16_s",
    64926: "i16x8.extmul_low_i8x16_u",
    64927: "i16x8.extmul_high_i8x16_u",
    64894: "i32x4.extadd_pairwise_i16x8_s",
    64895: "i32x4.extadd_pairwise_i16x8_u",
    64928: "i32x4.abs",
    64929: "i32x4.neg",
    64931: "i32x4.all_true",
    64932: "i32x4.bitmask",
    64935: "i32x4.extend_low_i16x8_s",
    64936: "i32x4.extend_high_i16x8_s",
    64937: "i32x4.extend_low_i16x8_u",
    64938: "i32x4.extend_high_i16x8_u",
    64939: "i32x4.shl",
    64940: "i32x4.shr_s",
    64941: "i32x4.shr_u",
    64942: "i32x4.add",
    64945: "i32x4.sub",
    64949: "i32x4.mul",
    64950: "i32x4.min_s",
    64951: "i32x4.min_u",
    64952: "i32x4.max_s",
    64953: "i32x4.max_u",
    64954: "i32x4.dot_i16x8_s",
    64956: "i32x4.extmul_low_i16x8_s",
    64957: "i32x4.extmul_high_i16x8_s",
    64958: "i32x4.extmul_low_i16x8_u",
    64959: "i32x4.extmul_high_i16x8_u",
    64960: "i64x2.abs",
    64961: "i64x2.neg",
    64963: "i64x2.all_true",
    64964: "i64x2.bitmask",
    64967: "i64x2.extend_low_i32x4_s",
    64968: "i64x2.extend_high_i32x4_s",
    64969: "i64x2.extend_low_i32x4_u",
    64970: "i64x2.extend_high_i32x4_u",
    64971: "i64x2.shl",
    64972: "i64x2.shr_s",
    64973: "i64x2.shr_u",
    64974: "i64x2.add",
    64977: "i64x2.sub",
    64981: "i64x2.mul",
    64988: "i64x2.extmul_low_i32x4_s",
    64989: "i64x2.extmul_high_i32x4_s",
    64990: "i64x2.extmul_low_i32x4_u",
    64991: "i64x2.extmul_high_i32x4_u",
    64871: "f32x4.ceil",
    64872: "f32x4.floor",
    64873: "f32x4.trunc",
    64874: "f32x4.nearest",
    64992: "f32x4.abs",
    64993: "f32x4.neg",
    64995: "f32x4.sqrt",
    64996: "f32x4.add",
    64997: "f32x4.sub",
    64998: "f32x4.mul",
    64999: "f32x4.div",
    65000: "f32x4.min",
    65001: "f32x4.max",
    65002: "f32x4.pmin",
    65003: "f32x4.pmax",
    64884: "f64x2.ceil",
    64885: "f64x2.floor",
    64890: "f64x2.trunc",
    64916: "f64x2.nearest",
    65004: "f64x2.abs",
    65005: "f64x2.neg",
    65007: "f64x2.sqrt",
    65008: "f64x2.add",
    65009: "f64x2.sub",
    65010: "f64x2.mul",
    65011: "f64x2.div",
    65012: "f64x2.min",
    65013: "f64x2.max",
    65014: "f64x2.pmin",
    65015: "f64x2.pmax",
    65016: "i32x4.trunc_sat_f32x4_s",
    65017: "i32x4.trunc_sat_f32x4_u",
    65018: "f32x4.convert_i32x4_s",
    65019: "f32x4.convert_i32x4_u",
    65020: "i32x4.trunc_sat_f64x2_s_zero",
    65021: "i32x4.trunc_sat_f64x2_u_zero",
    65022: "f64x2.convert_low_i32x4_s",
    65023: "f64x2.convert_low_i32x4_u",
    64862: "f32x4.demote_f64x2_zero",
    64863: "f64x2.promote_low_f32x4",
};
const opcodePrefixes = [0xFC, 0xFD];
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
exports.SectionName = {
    [0]: "custom",
    [1]: "type",
    [2]: "import",
    [3]: "function",
    [4]: "table",
    [5]: "memory",
    [6]: "global",
    [7]: "export",
    [8]: "start",
    [9]: "element",
    [10]: "code",
    [11]: "data",
    [12]: "datacount"
};
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
    readMemoryArgument() {
        return {
            align: this.readUint32(),
            offset: this.readUint32()
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
                immediates.bytes = new Int8Array(this.readByteVector(16).buffer);
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
            type: -16,
            initialization: []
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
            body: this.readInstructionExpression()
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
        });
    }
}
exports.WasmModule = WasmModule;
exports.WasmParser = WasmModule;
//# sourceMappingURL=parser.js.map