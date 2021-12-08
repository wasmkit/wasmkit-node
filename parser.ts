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

// §5.3.1
export const enum NumberType {
    I32 = -0x1,
    I64 = -0x2,
    F32 = -0x3,
    F64 = -0x4
}

export const NumberTypeString: Record<NumberType, string> = {
    [NumberType.I32]: "i32",
    [NumberType.I64]: "i64",
    [NumberType.F32]: "f32",
    [NumberType.F64]: "f64"
}

// §5.3.2
export const enum VectorType {
    V128 = 0x7B
}

// §5.3.3
export const enum ReferenceType {
    FunctionReference = -0x10,
    ExternalReference = -0x11
}

export const ReferenceTypeString: Record<ReferenceType, string> = {
    [ReferenceType.FunctionReference]: "funcref",
    [ReferenceType.ExternalReference]: "externref"
}

// §5.3.4
export const enum ValueType {
    I32 = -0x1,
    I64 = -0x2,
    F32 = -0x3,
    F64 = -0x4,

    FunctionReference = -0x10,
    ExternalReference = -0x11,

    // Function = -0x20
}

export const ValueTypeString: Record<ValueType, string> = {
    [ValueType.I32]: NumberTypeString[NumberType.I32],
    [ValueType.I64]: NumberTypeString[NumberType.I64],
    [ValueType.F32]: NumberTypeString[NumberType.F32],
    [ValueType.F64]: NumberTypeString[NumberType.F64],
    [ValueType.FunctionReference]: ReferenceTypeString[ReferenceType.FunctionReference],
    [ValueType.ExternalReference]: ReferenceTypeString[ReferenceType.ExternalReference]
}

export const enum BlockType {
    I32 = -0x1,
    I64 = -0x2,
    F32 = -0x3,
    F64 = -0x4,

    FunctionReference = -0x10,
    ExternalReference = -0x11,

    Void = -0x40
}

export const BlockTypeString: Record<BlockType, string> = {
    [BlockType.I32]: NumberTypeString[NumberType.I32],
    [BlockType.I64]: NumberTypeString[NumberType.I64],
    [BlockType.F32]: NumberTypeString[NumberType.F32],
    [BlockType.F64]: NumberTypeString[NumberType.F64],
    [BlockType.FunctionReference]: ReferenceTypeString[ReferenceType.FunctionReference],
    [BlockType.ExternalReference]: ReferenceTypeString[ReferenceType.ExternalReference],
    [BlockType.Void]: "void"
}

export const enum ExternalType {
    Function = 0,
    Table = 1,
    Memory = 2,
    Global = 3
}

export const ExternalTypeString: Record<ExternalType, string> = {
    [ExternalType.Function]: "function",
    [ExternalType.Table]: "table",
    [ExternalType.Memory]: "memory",
    [ExternalType.Global]: "global"
}


// §5.3.6
export interface FunctionType {
    params: ValueType[];
    results: ValueType[];
}

// §5.3.7
export interface ResizableLimits {
    min: number;
    max?: number;
}

// §5.3.8
export interface MemoryType {
    limits: ResizableLimits;
}
// §5.3.9
export interface TableType {
    referenceType: ReferenceType;
    limits: ResizableLimits;
}
// §5.3.10
export interface GlobalType {
    valueType: ValueType;
    mutable: boolean;
}

// §5.4
export const enum Opcode {
    // §5.4.1 - control
    Unreachable = 0x00,
    Nop = 0x01,
    Block = 0x02,
    Loop = 0x03,
    If = 0x04,
    Else = 0x05,
    End = 0x0B,
    Br = 0x0C,
    BrIf = 0x0D,
    BrTable = 0x0E,
    Return = 0x0F,
    Call = 0x10,
    CallIndirect = 0x11,

    // §5.4.2 - reference
    RefNull = 0xD0,
    RefIsNull = 0xD1,
    RefFunc = 0xD2,

    // §5.4.3 - parametric
    Drop = 0x1A,
    Select = 0x1B,
    SelectWithType = 0x1C,

    // §5.4.4 - variable
    LocalGet = 0x20,
    LocalSet = 0x21,
    LocalTee = 0x22,
    GlobalGet = 0x23,
    GlobalSet = 0x24,

    // §5.4.5 - table
    TableGet = 0x25,
    TableSet = 0x26,
    TableInit = 0xFC_0C,
    ElemDrop = 0xFC_0D,
    TableCopy = 0xFC_0E,
    TableGrow = 0xFC_0F,
    TableSize = 0xFC_10,
    TableFill = 0xFC_11,

    // §5.4.6 - memory
    I32Load = 0x28,
    I64Load = 0x29,
    F32Load = 0x2A,
    F64Load = 0x2B,
    I32Load8_S = 0x2C,
    I32Load8_U = 0x2D,
    I32Load16_S = 0x2E,
    I32Load16_U = 0x2F,
    I64Load8_S = 0x30,
    I64Load8_U = 0x31,
    I64Load16_S = 0x32,
    I64Load16_U = 0x33,
    I64Load32_S = 0x34,
    I64Load32_U = 0x35,
    I32Store = 0x36,
    I64Store = 0x37,
    F32Store = 0x38,
    F64Store = 0x39,
    I32Store8 = 0x3A,
    I32Store16 = 0x3B,
    I64Store8 = 0x3C,
    I64Store16 = 0x3D,
    I64Store32 = 0x3E,
    MemorySize = 0x3F,
    MemoryGrow = 0x40,
    MemoryInit = 0xFC_08,
    DataDrop = 0xFC_09,
    MemoryCopy = 0xFC_0A,
    MemoryFill = 0xFC_0B,

    // §5.4.7 -  numeric
    I32Const = 0x41,
    I64Const = 0x42,
    F32Const = 0x43,
    F64Const = 0x44,

    I32Eqz = 0x45,
    I32Eq = 0x46,
    I32Ne = 0x47,
    I32Lt_S = 0x48,
    I32Lt_U = 0x49,
    I32Gt_S = 0x4A,
    I32Gt_U = 0x4B,
    I32Le_S = 0x4C,
    I32Le_U = 0x4D,
    I32Ge_S = 0x4E,
    I32Ge_U = 0x4F,

    I64Eqz = 0x50,
    I64Eq = 0x51,
    I64_ne = 0x52,
    I64Lt_S = 0x53,
    I64Lt_U = 0x54,
    I64Gt_S = 0x55,
    I64Gt_U = 0x56,
    I64Le_S = 0x57,
    I64Le_U = 0x58,
    I64Ge_S = 0x59,
    I64Ge_U = 0x5A,

    F32Eq = 0x5B,
    F32Ne = 0x5C,
    F32Lt = 0x5D,
    F32Gt = 0x5E,
    F32Le = 0x5F,
    F32Ge = 0x60,

    F64Eq = 0x61,
    F64Ne = 0x62,
    F64Lt = 0x63,
    F64Gt = 0x64,
    F64Le = 0x65,
    F64Ge = 0x66,

    I32Clz = 0x67,
    I32Ctz = 0x68,
    I32Popcnt = 0x69,
    I32Add = 0x6A,
    I32Sub = 0x6B,
    I32Mul = 0x6C,
    I32Div_S = 0x6D,
    I32Div_U = 0x6E,
    I32Rem_S = 0x6F,
    I32Rem_U = 0x70,
    I32And = 0x71,
    I32Or = 0x72,
    I32Xor = 0x73,
    I32Shl = 0x74,
    I32Shr_S = 0x75,
    I32Shr_U = 0x76,
    I32Rotl = 0x77,
    I32Rotr = 0x78,

    I64Clz = 0x79,
    I64Ctz = 0x7A,
    I64Popcnt = 0x7B,
    I64Add = 0x7C,
    I64Sub = 0x7D,
    I64Mul = 0x7E,
    I64Div_S = 0x7F,
    I64Div_U = 0x80,
    I64Rem_S = 0x81,
    I64Rem_U = 0x82,
    I64And = 0x83,
    I64Or = 0x84,
    I64Xor = 0x85,
    I64Shl = 0x86,
    I64Shr_S = 0x87,
    I64Shr_U = 0x88,
    I64Rotl = 0x89,
    I64Rotr = 0x8A,

    F32Abs = 0x8B,
    F32Neg = 0x8C,
    F32Ceil = 0x8D,
    F32Floor = 0x8E,
    F32Trunc = 0x8F,
    F32Nearest = 0x90,
    F32Sqrt = 0x91,
    F32Add = 0x92,
    F32Sub = 0x93,
    F32Mul = 0x94,
    F32Div = 0x95,
    F32Min = 0x96,
    F32Max = 0x97,
    F32Copysign = 0x98,

    F64Abs = 0x99,
    F64Neg = 0x9A,
    F64Ceil = 0x9B,
    F64Floor = 0x9C,
    F64Trunc = 0x9D,
    F64Nearest = 0x9E,
    F64Sqrt = 0x9F,
    F64Add = 0xA0,
    F64Sub = 0xA1,
    F64Mul = 0xA2,
    F64Div = 0xA3,
    F64Min = 0xA4,
    F64Max = 0xA5,
    F64Copysign = 0xA6,

    I32WrapI64 = 0xA7,
    I32TruncF32_S = 0xA8,
    I32TruncF32_U = 0xA9,
    I32TruncF64_S = 0xAA,
    I32TruncF64_U = 0xAB,
    I64ExtendI32_S = 0xAC,
    I64ExtendI32_U = 0xAD,
    I64TruncF32_S = 0xAE,
    I64TruncF32_U = 0xAF,
    I64TruncF64_S = 0xB0,
    I64TruncF64_U = 0xB1,
    F32ConvertI32_S = 0xB2,
    F32ConvertI32_U = 0xB3,
    F32ConvertI64_S = 0xB4,
    F32ConvertI64_U = 0xB5,
    F32DemoteF64 = 0xB6,
    F64ConvertI32_S = 0xB7,
    F64ConvertI32_U = 0xB8,
    F64ConvertI64_S = 0xB9,
    F64ConvertI64_U = 0xBA,
    F64PromoteF32 = 0xBB,
    I32ReinterpretF32 = 0xBC,
    I64ReinterpretF64 = 0xBD,
    F32ReinterpretF32 = 0xBE,
    F64ReinterpretF64 = 0xBF,

    I32Extend8_S = 0xC0,
    I32Extend16_S = 0xC1,
    I64Extend8_S = 0xC2,
    I64Extend16_S = 0xC3,
    I64Extend32_S = 0xC4,

    I32TruncSatF32_S = 0xFC_00,
    I32TruncSatF32_U = 0xFC_01,
    I32TruncSatF64_S = 0xFC_02,
    I32TruncSatF64_U = 0xFC_03,
    I64TruncSatF32_S = 0xFC_04,
    I64TruncSatF32_U = 0xFC_05,
    I64TruncSatF64_S = 0xFC_06,
    I64TruncSatF64_U = 0xFC_07,

    // §5.4.7 - vector
    V128Load = 0xFD_00,
    V128Load8x8_S = 0xFD_01,
    V128Load8x8_U = 0xFD_02,
    V128Load16x4_S = 0xFD_03,
    V128Load16x4_U = 0xFD_04,
    V128Load32x2_S = 0xFD_05,
    V128Load32x2_U = 0xFD_06,
    V128Load8Splat = 0xFD_07,
    V128Load16Splat = 0xFD_08,
    V128Load32Splat = 0xFD_09,
    V128Load64Splat = 0xFD_0A,
    V128Load32Zero = 0xFD_5C,
    V128Load64Zero = 0xFD_5D,
    V128Store = 0xFD_0B,
    V128Load8Lane = 0xFD_54,
    V128Load16Lane = 0xFD_55,
    V128Load32Lane = 0xFD_56,
    V128Load64Lane = 0xFD_57,
    V128Store8Lane = 0xFD_58,
    V128Store16Lane = 0xFD_59,
    V128Store32Lane = 0xFD_5A,
    V128Store64Lane = 0xFD_5B,
    V128Const = 0xFD_0C,
    I8x16Shuffle = 0xFD_0D,
    I8x16Swizzle = 0xFD_0E,
    I8x16Splat = 0xFD_0F,
    I16x8Splat = 0xFD_10,
    I32x4Splat = 0xFD_11,
    I64x2Splat = 0xFD_12,
    F32x4Splat = 0xFD_13,
    F64x2Splat = 0xFD_14,
    I8x16ExtractLane_S = 0xFD_15,
    I8x16ExtractLane_U = 0xFD_16,
    I8x16ReplaceLane = 0xFD_17,
    I16x8ExtractLane_S = 0xFD_18,
    I16x8ExtractLane_U = 0xFD_19,
    I16x8ReplaceLane = 0xFD_1A,
    I32x4ExtractLane = 0xFD_1B,
    I32x4ReplaceLane = 0xFD_1C,
    I64x2ExtractLane = 0xFD_1D,
    I64x2ReplaceLane = 0xFD_1E,
    F32x4ExtractLane = 0xFD_1F,
    F32x4ReplaceLane = 0xFD_20,
    F64x2ExtractLane = 0xFD_21,
    F64x2ReplaceLane = 0xFD_22,
    I8x16Eq = 0xFD_23,
    I8x16Ne = 0xFD_24,
    I8x16Lt_S = 0xFD_25,
    I8x16Lt_U = 0xFD_26,
    I8x16Gt_S = 0xFD_27,
    I8x16Gt_U = 0xFD_28,
    I8x16Le_S = 0xFD_29,
    I8x16Le_U = 0xFD_2A,
    I8x16Ge_S = 0xFD_2B,
    I8x16Ge_U = 0xFD_2C,
    I16x8Eq = 0xFD_2D,
    I16x8Ne = 0xFD_2E,
    I16x8Lt_S = 0xFD_2F,
    I16x8Lt_U = 0xFD_30,
    I16x8Gt_S = 0xFD_31,
    I16x8Gt_U = 0xFD_32,
    I16x8Le_S = 0xFD_33,
    I16x8Le_U = 0xFD_34,
    I16x8Ge_S = 0xFD_35,
    I16x8Ge_U = 0xFD_36,
    I32x4Eq = 0xFD_37,
    I32x4Ne = 0xFD_38,
    I32x4Lt_S = 0xFD_39,
    I32x4Lt_U = 0xFD_3A,
    I32x4Gt_S = 0xFD_3B,
    I32x4Gt_U = 0xFD_3C,
    I32x4Le_S = 0xFD_3D,
    I32x4Le_U = 0xFD_3E,
    I32x4Ge_S = 0xFD_3F,
    I32x4Ge_U = 0xFD_40,
    I64x2Eq = 0xFD_D6,
    I64x2Ne = 0xFD_D7,
    I64x2Lt_S = 0xFD_D8,
    I64x2Gt_S = 0xFD_D9,
    I64x2Le_S = 0xFD_DA,
    I64x2Ge_S = 0xFD_DB,
    F32x4Eq = 0xFD_41,
    F32x4Ne = 0xFD_42,
    F32x4Lt = 0xFD_43,
    F32x4Gt = 0xFD_44,
    F32x4Le = 0xFD_45,
    F32x4Ge = 0xFD_46,
    F64x2Eq = 0xFD_47,
    F64x2Ne = 0xFD_48,
    F64x2Lt = 0xFD_49,
    F64x2Gt = 0xFD_4A,
    F64x2Le = 0xFD_4B,
    F64x2Ge = 0xFD_4C,
    V128Not = 0xFD_4D,
    V128And = 0xFD_4E,
    V128Andnot = 0xFD_4F,
    V128Or = 0xFD_50,
    V128Xor = 0xFD_51,
    V128Bitselect = 0xFD_52,
    V128AnyTrue = 0xFD_53,
    I8x16Abs = 0xFD_60,
    I8x16Neg = 0xFD_61,
    I8x16Popcnt = 0xFD_62,
    I8x16AllTrue = 0xFD_63,
    I8x16Bitmask = 0xFD_64,
    I8x16NarrowI16x8_S = 0xFD_65,
    I8x16NarrowI16x8_U = 0xFD_66,
    I8x16Shl = 0xFD_6B,
    I8x16Shr_S = 0xFD_6C,
    I8x16Shr_U = 0xFD_6D,
    I8x16Add = 0xFD_6E,
    I8x16AddSat_S = 0xFD_6F,
    I8x16AddSat_U = 0xFD_70,
    I8x16Sub = 0xFD_71,
    I8x16SubSat_S = 0xFD_72,
    I8x16SubSat_U = 0xFD_73,
    I8x16Min_S = 0xFD_76,
    I8x16Min_U = 0xFD_77,
    I8x16Max_S = 0xFD_78,
    I8x16Max_U = 0xFD_79,
    I8x16Avgr_U = 0xFD_7B,
    I16x8ExtaddPairwiseI8x16_S = 0xFD_7C,
    I16x8ExtaddPairwiseI8x16_U = 0xFD_7D,
    I16x8Abs = 0xFD_80,
    I16x8Neg = 0xFD_81,
    I16x8Q15mulrSat_S = 0xFD_82,
    I16x8AllTrue = 0xFD_83,
    I16x8Bitmask = 0xFD_84,
    I16x8NarrowI32x4_S = 0xFD_85,
    I16x8NarrowI32x4_U = 0xFD_86,
    I16x8ExtendLowI8x16_S = 0xFD_87,
    I16x8ExtendHighI8x16_S = 0xFD_88,
    I16x8ExtendLowI8x16_U = 0xFD_89,
    I16x8ExtendHighI8x16_U = 0xFD_8A,
    I16x8Shl = 0xFD_8B,
    I16x8Shr_S = 0xFD_8C,
    I16x8Shr_U = 0xFD_8D,
    I16x8Add = 0xFD_8E,
    I16x8AddSat_S = 0xFD_8F,
    I16x8AddSat_U = 0xFD_90,
    I16x8Sub = 0xFD_91,
    I16x8SubSat_S = 0xFD_92,
    I16x8SubSat_U = 0xFD_93,
    I16x8Mul = 0xFD_95,
    I16x8Min_S = 0xFD_96,
    I16x8Min_U = 0xFD_97,
    I16x8Max_S = 0xFD_98,
    I16x8Max_U = 0xFD_99,
    I16x8Avgr_U = 0xFD_9B,
    I16x8ExtmulLowI8x16_S = 0xFD_9C,
    I16x8ExtmulHighI8x16_S = 0xFD_9D,
    I16x8ExtmulLowI8x16_U = 0xFD_9E,
    I16x8ExtmulHighI8x16_U = 0xFD_9F,
    I32x4ExtaddPairwiseI16x8_S = 0xFD_7E,
    I32x4ExtaddPairwiseI16x8_U = 0xFD_7F,
    I32x4Abs = 0xFD_A0,
    I32x4Neg = 0xFD_A1,
    I32x4AllTrue = 0xFD_A3,
    I32x4Bitmask = 0xFD_A4,
    I32x4ExtendLowI16x8_S = 0xFD_A7,
    I32x4ExtendHighI16x8_S = 0xFD_A8,
    I32x4ExtendLowI16x8_U = 0xFD_A9,
    I32x4ExtendHighI16x8_U = 0xFD_AA,
    I32x4Shl = 0xFD_AB,
    I32x4Shr_S = 0xFD_AC,
    I32x4Shr_U = 0xFD_AD,
    I32x4Add = 0xFD_AE,
    I32x4Sub = 0xFD_B1,
    I32x4Mul = 0xFD_B5,
    I32x4Min_S = 0xFD_B6,
    I32x4Min_U = 0xFD_B7,
    I32x4Max_S = 0xFD_B8,
    I32x4Max_U = 0xFD_B9,
    I32x4DotI16x8_S = 0xFD_BA,
    I32x4ExtmulLowI16x8_S = 0xFD_BC,
    I32x4ExtmulHighI16x8_S = 0xFD_BD,
    I32x4ExtmulLowI16x8_U = 0xFD_BE,
    I32x4ExtmulHighI16x8_U = 0xFD_BF,
    I64x2Abs = 0xFD_C0,
    I64x2Neg = 0xFD_C1,
    I64x2AllTrue = 0xFD_C3,
    I64x2Bitmask = 0xFD_C4,
    I64x2ExtendLowI32x4_S = 0xFD_C7,
    I64x2ExtendHighI32x4_S = 0xFD_C8,
    I64x2ExtendLowI32x4_U = 0xFD_C9,
    I64x2ExtendHighI32x4_U = 0xFD_CA,
    I64x2Shl = 0xFD_CB,
    I64x2Shr_S = 0xFD_CC,
    I64x2Shr_U = 0xFD_CD,
    I64x2Add = 0xFD_CE,
    I64x2Sub = 0xFD_D1,
    I64x2Mul = 0xFD_D5,
    I64x2ExtmulLowI32x4_S = 0xFD_DC,
    I64x2ExtmulHighI32x4_S = 0xFD_DD,
    I64x2ExtmulLowI32x4_U = 0xFD_DE,
    I64x2ExtmulHighI32x4_U = 0xFD_DF,
    F32x4Ceil = 0xFD_67,
    F32x4Floor = 0xFD_68,
    F32x4Trunc = 0xFD_69,
    F32x4Nearest = 0xFD_6A,
    F32x4Abs = 0xFD_E0,
    F32x4Neg = 0xFD_E1,
    F32x4Sqrt = 0xFD_E3,
    F32x4Add = 0xFD_E4,
    F32x4Sub = 0xFD_E5,
    F32x4Mul = 0xFD_E6,
    F32x4Div = 0xFD_E7,
    F32x4Min = 0xFD_E8,
    F32x4Max = 0xFD_E9,
    F32x4Pmin = 0xFD_EA,
    F32x4Pmax = 0xFD_EB,
    F64x2Ceil = 0xFD_74,
    F64x2Floor = 0xFD_75,
    F64x2Trunc = 0xFD_7A,
    F64x2Nearest = 0xFD_94,
    F64x2Abs = 0xFD_EC,
    F64x2Neg = 0xFD_ED,
    F64x2Sqrt = 0xFD_EF,
    F64x2Add = 0xFD_F0,
    F64x2Sub = 0xFD_F1,
    F64x2Mul = 0xFD_F2,
    F64x2Div = 0xFD_F3,
    F64x2Min = 0xFD_F4,
    F64x2Max = 0xFD_F5,
    F64x2Pmin = 0xFD_F6,
    F64x2Pmax = 0xFD_F7,
    I32x4TruncSatF32x4_S = 0xFD_F8,
    I32x4TruncSatF32x4_U = 0xFD_F9,
    F32x4ConvertI32x4_S = 0xFD_FA,
    F32x4ConvertI32x4_U = 0xFD_FB,
    I32x4TruncSatF64x2_SZero = 0xFD_FC,
    I32x4TruncSatF64x2_UZero = 0xFD_FD,
    F64x2ConvertLowI32x4_S = 0xFD_FE,
    F64x2ConvertLowI32x4_U = 0xFD_FF,
    F32x4DemoteF64x2Zero = 0xFD_5E,
    F64x2PromoteLowF32x4 = 0xFD_5F,
}

export const Opstring: Record<Opcode, string> = {
    // §5.4.1 - control
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

    // §5.4.2 - reference
    0xD0: "ref.null",
    0xD1: "ref.is_null",
    0xD2: "ref.func",

    // §5.4.3 - parametric
    0x1A: "drop",
    0x1B: "select",
    0x1C: "select",

    // §5.4.4 - variable
    0x20: "local.get",
    0x21: "local.set",
    0x22: "local.tee",
    0x23: "global.get",
    0x24: "global.set",

    // §5.4.5 - table
    0x25: "table.get",
    0x26: "table.set",
    0xFC_0C: "table.init",
    0xFC_0D: "elem.drop",
    0xFC_0E: "table.copy",
    0xFC_0F: "table.grow",
    0xFC_10: "table.size",
    0xFC_11: "table.fill",

    // §5.4.6 - memory
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
    0xFC_08: "memory.init",
    0xFC_09: "data.drop",
    0xFC_0A: "memory.copy",
    0xFC_0B: "memory.fill",

    // §5.4.7 - numeric
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

    0xFC_00: "i32.trunc_sat_f32_s",
    0xFC_01: "i32.trunc_sat_f32_u",
    0xFC_02: "i32.trunc_sat_f64_s",
    0xFC_03: "i32.trunc_sat_f64_u",
    0xFC_04: "i64.trunc_sat_f32_s",
    0xFC_05: "i64.trunc_sat_f32_u",
    0xFC_06: "i64.trunc_sat_f64_s",
    0xFC_07: "i64.trunc_sat_f64_u",

    // §5.4.8 - vector
    0xFD_00: "v128.load",
    0xFD_01: "v128.load8x8_s",
    0xFD_02: "v128.load8x8_u",
    0xFD_03: "v128.load16x4_s",
    0xFD_04: "v128.load16x4_u",
    0xFD_05: "v128.load32x2_s",
    0xFD_06: "v128.load32x2_u",
    0xFD_07: "v128.load8Splat",
    0xFD_08: "v128.load16Splat",
    0xFD_09: "v128.load32Splat",
    0xFD_0A: "v128.load64Splat",
    0xFD_5C: "v128.load32Zero",
    0xFD_5D: "v128.load64Zero",
    0xFD_0B: "v128.store",
    0xFD_54: "v128.load8_lane",
    0xFD_55: "v128.load16_lane",
    0xFD_56: "v128.load32_lane",
    0xFD_57: "v128.load64_lane",
    0xFD_58: "v128.store8_lane",
    0xFD_59: "v128.store16_lane",
    0xFD_5A: "v128.store32_lane",
    0xFD_5B: "v128.store64_lane",
    0xFD_0C: "v128.const",
    0xFD_0D: "i8x16.shuffle",
    0xFD_15: "i8x16.extract_lane_s",
    0xFD_16: "i8x16.extract_lane_u",
    0xFD_17: "i8x16.replace_lane",
    0xFD_18: "i16x8.extract_lane_s",
    0xFD_19: "i16x8.extract_lane_u",
    0xFD_1A: "i16x8.replace_lane",
    0xFD_1B: "i32x4.extract_lane",
    0xFD_1C: "i32x4.replace_lane",
    0xFD_1D: "i64x2.extract_lane",
    0xFD_1E: "i64x2.replace_lane",
    0xFD_1F: "f32x4.extract_lane",
    0xFD_20: "f32x4.replace_lane",
    0xFD_21: "f64x2.extract_lane",
    0xFD_22: "f64x2.replace_lane",
    0xFD_0E: "i8x16.swizzle",
    0xFD_0F: "i8x16.splat",
    0xFD_10: "i16x8.splat",
    0xFD_11: "i32x4.splat",
    0xFD_12: "i64x2.splat",
    0xFD_13: "f32x4.splat",
    0xFD_14: "f64x2.splat",
    0xFD_23: "i8x16.eq",
    0xFD_24: "i8x16.ne",
    0xFD_25: "i8x16.lt_s",
    0xFD_26: "i8x16.lt_u",
    0xFD_27: "i8x16.gt_s",
    0xFD_28: "i8x16.gt_u",
    0xFD_29: "i8x16.le_s",
    0xFD_2A: "i8x16.le_u",
    0xFD_2B: "i8x16.ge_s",
    0xFD_2C: "i8x16.ge_u",
    0xFD_2D: "i16x8.eq",
    0xFD_2E: "i16x8.ne",
    0xFD_2F: "i16x8.lt_s",
    0xFD_30: "i16x8.lt_u",
    0xFD_31: "i16x8.gt_s",
    0xFD_32: "i16x8.gt_u",
    0xFD_33: "i16x8.le_s",
    0xFD_34: "i16x8.le_u",
    0xFD_35: "i16x8.ge_s",
    0xFD_36: "i16x8.ge_u",
    0xFD_37: "i32x4.eq",
    0xFD_38: "i32x4.ne",
    0xFD_39: "i32x4.lt_s",
    0xFD_3A: "i32x4.lt_u",
    0xFD_3B: "i32x4.gt_s",
    0xFD_3C: "i32x4.gt_u",
    0xFD_3D: "i32x4.le_s",
    0xFD_3E: "i32x4.le_u",
    0xFD_3F: "i32x4.ge_s",
    0xFD_40: "i32x4.ge_u",
    0xFD_D6: "i64x2.eq",
    0xFD_D7: "i64x2.ne",
    0xFD_D8: "i64x2.lt_s",
    0xFD_D9: "i64x2.gt_s",
    0xFD_DA: "i64x2.le_s",
    0xFD_DB: "i64x2.ge_s",
    0xFD_41: "f32x4.eq",
    0xFD_42: "f32x4.ne",
    0xFD_43: "f32x4.lt",
    0xFD_44: "f32x4.gt",
    0xFD_45: "f32x4.le",
    0xFD_46: "f32x4.ge",
    0xFD_47: "f64x2.eq",
    0xFD_48: "f64x2.ne",
    0xFD_49: "f64x2.lt",
    0xFD_4A: "f64x2.gt",
    0xFD_4B: "f64x2.le",
    0xFD_4C: "f64x2.ge",
    0xFD_4D: "v128.not",
    0xFD_4E: "v128.and",
    0xFD_4F: "v128.andnot",
    0xFD_50: "v128.or",
    0xFD_51: "v128.xor",
    0xFD_52: "v128.bitselect",
    0xFD_53: "v128.any_true",
    0xFD_60: "i8x16.abs",
    0xFD_61: "i8x16.neg",
    0xFD_62: "i8x16.popcnt",
    0xFD_63: "i8x16.all_true",
    0xFD_64: "i8x16.bitmask",
    0xFD_65: "i8x16.narrow_i16x8_s",
    0xFD_66: "i8x16.narrow_i16x8_u",
    0xFD_6B: "i8x16.shl",
    0xFD_6C: "i8x16.shr_s",
    0xFD_6D: "i8x16.shr_u",
    0xFD_6E: "i8x16.add",
    0xFD_6F: "i8x16.add_sat_s",
    0xFD_70: "i8x16.add_sat_u",
    0xFD_71: "i8x16.sub",
    0xFD_72: "i8x16.sub_sat_s",
    0xFD_73: "i8x16.sub_sat_u",
    0xFD_76: "i8x16.min_s",
    0xFD_77: "i8x16.min_u",
    0xFD_78: "i8x16.max_s",
    0xFD_79: "i8x16.max_u",
    0xFD_7B: "i8x16.avgr_u",
    0xFD_7C: "i16x8.extadd_pairwise_i8x16_s",
    0xFD_7D: "i16x8.extadd_pairwise_i8x16_u",
    0xFD_80: "i16x8.abs",
    0xFD_81: "i16x8.neg",
    0xFD_82: "i16x8.q15mulr_sat_s",
    0xFD_83: "i16x8.all_true",
    0xFD_84: "i16x8.bitmask",
    0xFD_85: "i16x8.narrow_i32x4_s",
    0xFD_86: "i16x8.narrow_i32x4_u",
    0xFD_87: "i16x8.extend_low_i8x16_s",
    0xFD_88: "i16x8.extend_high_i8x16_s",
    0xFD_89: "i16x8.extend_low_i8x16_u",
    0xFD_8A: "i16x8.extend_high_i8x16_u",
    0xFD_8B: "i16x8.shl",
    0xFD_8C: "i16x8.shr_s",
    0xFD_8D: "i16x8.shr_u",
    0xFD_8E: "i16x8.add",
    0xFD_8F: "i16x8.add_sat_s",
    0xFD_90: "i16x8.add_sat_u",
    0xFD_91: "i16x8.sub",
    0xFD_92: "i16x8.sub_sat_s",
    0xFD_93: "i16x8.sub_sat_u",
    0xFD_95: "i16x8.mul",
    0xFD_96: "i16x8.min_s",
    0xFD_97: "i16x8.min_u",
    0xFD_98: "i16x8.max_s",
    0xFD_99: "i16x8.max_u",
    0xFD_9B: "i16x8.avgr_u",
    0xFD_9C: "i16x8.extmul_low_i8x16_s",
    0xFD_9D: "i16x8.extmul_high_i8x16_s",
    0xFD_9E: "i16x8.extmul_low_i8x16_u",
    0xFD_9F: "i16x8.extmul_high_i8x16_u",
    0xFD_7E: "i32x4.extadd_pairwise_i16x8_s",
    0xFD_7F: "i32x4.extadd_pairwise_i16x8_u",
    0xFD_A0: "i32x4.abs",
    0xFD_A1: "i32x4.neg",
    0xFD_A3: "i32x4.all_true",
    0xFD_A4: "i32x4.bitmask",
    0xFD_A7: "i32x4.extend_low_i16x8_s",
    0xFD_A8: "i32x4.extend_high_i16x8_s",
    0xFD_A9: "i32x4.extend_low_i16x8_u",
    0xFD_AA: "i32x4.extend_high_i16x8_u",
    0xFD_AB: "i32x4.shl",
    0xFD_AC: "i32x4.shr_s",
    0xFD_AD: "i32x4.shr_u",
    0xFD_AE: "i32x4.add",
    0xFD_B1: "i32x4.sub",
    0xFD_B5: "i32x4.mul",
    0xFD_B6: "i32x4.min_s",
    0xFD_B7: "i32x4.min_u",
    0xFD_B8: "i32x4.max_s",
    0xFD_B9: "i32x4.max_u",
    0xFD_BA: "i32x4.dot_i16x8_s",
    0xFD_BC: "i32x4.extmul_low_i16x8_s",
    0xFD_BD: "i32x4.extmul_high_i16x8_s",
    0xFD_BE: "i32x4.extmul_low_i16x8_u",
    0xFD_BF: "i32x4.extmul_high_i16x8_u",
    0xFD_C0: "i64x2.abs",
    0xFD_C1: "i64x2.neg",
    0xFD_C3: "i64x2.all_true",
    0xFD_C4: "i64x2.bitmask",
    0xFD_C7: "i64x2.extend_low_i32x4_s",
    0xFD_C8: "i64x2.extend_high_i32x4_s",
    0xFD_C9: "i64x2.extend_low_i32x4_u",
    0xFD_CA: "i64x2.extend_high_i32x4_u",
    0xFD_CB: "i64x2.shl",
    0xFD_CC: "i64x2.shr_s",
    0xFD_CD: "i64x2.shr_u",
    0xFD_CE: "i64x2.add",
    0xFD_D1: "i64x2.sub",
    0xFD_D5: "i64x2.mul",
    0xFD_DC: "i64x2.extmul_low_i32x4_s",
    0xFD_DD: "i64x2.extmul_high_i32x4_s",
    0xFD_DE: "i64x2.extmul_low_i32x4_u",
    0xFD_DF: "i64x2.extmul_high_i32x4_u",
    0xFD_67: "f32x4.ceil",
    0xFD_68: "f32x4.floor",
    0xFD_69: "f32x4.trunc",
    0xFD_6A: "f32x4.nearest",
    0xFD_E0: "f32x4.abs",
    0xFD_E1: "f32x4.neg",
    0xFD_E3: "f32x4.sqrt",
    0xFD_E4: "f32x4.add",
    0xFD_E5: "f32x4.sub",
    0xFD_E6: "f32x4.mul",
    0xFD_E7: "f32x4.div",
    0xFD_E8: "f32x4.min",
    0xFD_E9: "f32x4.max",
    0xFD_EA: "f32x4.pmin",
    0xFD_EB: "f32x4.pmax",
    0xFD_74: "f64x2.ceil",
    0xFD_75: "f64x2.floor",
    0xFD_7A: "f64x2.trunc",
    0xFD_94: "f64x2.nearest",
    0xFD_EC: "f64x2.abs",
    0xFD_ED: "f64x2.neg",
    0xFD_EF: "f64x2.sqrt",
    0xFD_F0: "f64x2.add",
    0xFD_F1: "f64x2.sub",
    0xFD_F2: "f64x2.mul",
    0xFD_F3: "f64x2.div",
    0xFD_F4: "f64x2.min",
    0xFD_F5: "f64x2.max",
    0xFD_F6: "f64x2.pmin",
    0xFD_F7: "f64x2.pmax",
    0xFD_F8: "i32x4.trunc_sat_f32x4_s",
    0xFD_F9: "i32x4.trunc_sat_f32x4_u",
    0xFD_FA: "f32x4.convert_i32x4_s",
    0xFD_FB: "f32x4.convert_i32x4_u",
    0xFD_FC: "i32x4.trunc_sat_f64x2_s_zero",
    0xFD_FD: "i32x4.trunc_sat_f64x2_u_zero",
    0xFD_FE: "f64x2.convert_low_i32x4_s",
    0xFD_FF: "f64x2.convert_low_i32x4_u",
    0xFD_5E: "f32x4.demote_f64x2_zero",
    0xFD_5F: "f64x2.promote_low_f32x4",
};

const opcodePrefixes = [0xFC, 0xFD];

export interface Immediates {
    valueType?: ValueType;
    referenceType?: ReferenceType;
    valueTypes?: ValueType[];
    labelIndex?: number;
    labelIndexs?: number[];
    defaultLabelIndex?: number;
    functionIndex?: number;
    typeIndex?: number;
    tableIndex?: number;
    localIndex?: number;
    globalIndex?: number;
    elementIndex?: number;
    fromTableIndex?: number;
    toTableIndex?: number;
    memoryArgument?: MemoryArgument;
    dataIndex?: number;
    value?: number | bigint;
    laneIndex?: number;
    laneIndexs?: number[];
    bytes?: Uint8Array | Int8Array;
}

export interface Instruction {
    opcode: Opcode,
    opstring: string,
    immediates: Immediates;
}

// §5.4.6
export interface MemoryArgument {
    offset: number;
    align: number;
}

// §5.4.8
export type TerminatingEndInstruction = { opcode: Opcode.End } & Instruction;
export const TerminatingEndInstruction: TerminatingEndInstruction = {
    opcode: Opcode.End,
    opstring: Opstring[Opcode.End],
    immediates: {}
};

export type InstructionExpression = [...Instruction[], TerminatingEndInstruction];

// $5.5.2
export const enum SectionId {
    Custom = 0,
    Type = 1,
    Import = 2,
    Function = 3,
    Table = 4,
    Memory = 5,
    Global = 6,
    Export = 7,
    Start = 8,
    Element = 9,
    Code = 10,
    Data = 11,
    DataCount = 12
}

export const SectionName: Record<SectionId, string> = {
    [SectionId.Custom]: "custom",
    [SectionId.Type]: "type",
    [SectionId.Import]: "import",
    [SectionId.Function]: "function",
    [SectionId.Table]: "table",
    [SectionId.Memory]: "memory",
    [SectionId.Global]: "global",
    [SectionId.Export]: "export",
    [SectionId.Start]: "start",
    [SectionId.Element]: "element",
    [SectionId.Code]: "code",
    [SectionId.Data]: "data",
    [SectionId.DataCount]: "datacount"
}

// §5.5.5
export type ImportEntry = { module: string; name: string; type: ExternalType } &
    ({ type: ExternalType.Function, description: FunctionDescription } |
    { type: ExternalType.Table, description: TableType } |
    { type: ExternalType.Memory, description: MemoryType } |
    { type: ExternalType.Global, description: GlobalType });

// §5.5.6
export interface FunctionDescription {
    typeIndex: number;
}
// §5.5.9
export interface GlobalEntry {
    type: GlobalType,
    initialization: InstructionExpression
}

// §5.5.10
export type ExportEntry = { name: string, type: ExternalType } &
    ({ type: ExternalType.Function, description: { functionIndex: number } } |
    { type: ExternalType.Table, description: { tableIndex: number } } |
    { type: ExternalType.Memory, description: { memoryIndex: number } } |
    { type: ExternalType.Global, description: { globalIndex: number } });

// §5.5.12
export const enum ElementSegmentMode {
    Active = 0,
    Passive = 1,
    Declarative = 2
}

export const enum ElementKind {
    FunctionReference = 0x00
}

export interface ElementSegment {
    mode: ElementSegmentMode,
    tableIndex: number,
    type: ReferenceType | ElementKind,
    initialization: number[] | InstructionExpression[];
    offset?: InstructionExpression;
}

// §5.5.13
export interface FunctionCode {
    locals: ValueType[],
    body: InstructionExpression;
}

// §5.5.14
export const enum DataSegmentMode {
    Active = 0,
    Passive = 1,
    ActiveWithMemoryIndex = 2
}

export type DataSegment = { mode: DataSegmentMode, initialization: Uint8Array } &
    ({ mode: DataSegmentMode.Active, memoryIndex: number, offset: InstructionExpression } |
    { mode: DataSegmentMode.Passive } |
    { mode: DataSegmentMode.ActiveWithMemoryIndex, memoryIndex: number, offset: InstructionExpression })

// §5.5.16
export const SectionOrder = [SectionId.Type,
    SectionId.Import,
    SectionId.Function,
    SectionId.Table,
    SectionId.Memory,
    SectionId.Global,
    SectionId.Export,
    SectionId.Start,
    SectionId.Element,
    SectionId.DataCount,
    SectionId.Code,
    SectionId.Data];

export interface WasmFunction {
    typeIndex: number,
    locals: ValueType[],
    body: InstructionExpression
}

const convo = new ArrayBuffer(8);
const u8 = new Uint8Array(convo);
const f32 = new Float32Array(convo);
const f64 = new Float64Array(convo);
// @ts-ignore
const decoder: { decode(buffer: Uint8Array): string } = new TextDecoder();

export class WasmReader {
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
            "Limits maximum must be greater than or equal to minimum :: module malformed")

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

        if (opcodePrefixes.includes(opcode)) opcode = opcode << 8 | this.readUint32();

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
                immediates.bytes = new Int8Array(this.readByteVector(16).buffer);
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
            opstring: Opstring[opcode],
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

        // Can either be as ElementKind or as ReferenceType
        // TODO: Maybe check type? (Make sure its one of the 2 above)
        if ((modeFlags & 0b11) !== 0) segment.type = this.readByte();

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
            "Size does not match function code's length :: module malformed");

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
// §5.5.16
export class WasmModule {
    public readonly types: FunctionType[] = [];
    public readonly functions: WasmFunction[] = [];
    public readonly tables: TableType[] = [];
    public readonly memories: MemoryType[] = [];
    public readonly globals: GlobalEntry[] = [];
    public readonly elements: ElementSegment[] = [];
    public readonly datas: DataSegment[] = [];
    public readonly start: number | null = null;
    public readonly imports: ImportEntry[] = [];
    public readonly exports: ExportEntry[] = [];

    private constructor(configuration: {
        types: FunctionType[],
        functions: WasmFunction[],
        tables: TableType[],
        memories: MemoryType[],
        globals: GlobalEntry[],
        elements: ElementSegment[],
        datas: DataSegment[],
        start: number | null,
        imports: ImportEntry[],
        exports: ExportEntry[],
    }) {
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

    // §5.5.16
    static decodeFrom(buffer: Uint8Array) {
        const reader = new WasmReader(buffer);

        reader.assert((reader.readByte() << 24 |
            reader.readByte() << 16 |
            reader.readByte() << 8 |
            reader.readByte()) === 0x0061736D, 'Invalid magic :: module malformed');

        reader.assert((reader.readByte() |
            reader.readByte() << 8 |
            reader.readByte() << 16 |
            reader.readByte() << 24) === 1, 'Unsupported version');

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
            dataRaw: DataSegment[] = [];

        let orderPos = -1;
        
        while (reader.inBuffer()) {
            const id: SectionId = reader.readByte();
            const size = reader.readUint32();
            const start = reader.at;

            let newOrderPos = SectionOrder.indexOf(id);
            reader.assert(!SectionOrder.includes(id) || newOrderPos > orderPos,
                "Section " + id + " may not occur after " + SectionOrder[orderPos]);
            orderPos = newOrderPos;
            
            if (id !== SectionId.Custom) {
                reader.assert(!readSectionIds.includes(id),
                    "Section " + id + " may only occur once :: module malformed")
                readSectionIds.push(id);
            }

            switch (id) {
                case SectionId.Custom:
                    // TODO:
                    // Reimplement some custom section parsers
                    reader.at += size;
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
                        "For each function entry there should be a code entry, and vice versa :: module malformed");
                    break;
                case SectionId.Data:
                    dataRaw = reader.readVector(reader.readDataEntry);
                    reader.assert(dataCount === null || dataRaw.length === dataCount,
                        "Data entry count must be equal to predefined data count :: module malformed");
                    break;
                case SectionId.DataCount:
                    dataCount = reader.readUint32();
                    break;
            }

            reader.assert(reader.at - start === size,
                "Size does not match section's length :: module malformed");
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
export const WasmParser = WasmModule;