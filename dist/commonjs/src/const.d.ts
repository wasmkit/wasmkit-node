export declare const enum NumberType {
    I32 = -1,
    I64 = -2,
    F32 = -3,
    F64 = -4
}
export declare const NumberTypeString: Record<NumberType, string>;
export declare const InverseNumberTypeString: Record<string, NumberType>;
export declare const enum VectorType {
    V128 = -5
}
export declare const VectorTypeString: Record<VectorType, string>;
export declare const InverseVectorTypeString: Record<string, VectorType>;
export declare const enum ReferenceType {
    FunctionReference = -16,
    ExternalReference = -17
}
export declare const ReferenceTypeString: Record<ReferenceType, string>;
export declare const HeapTypeString: Record<ReferenceType, string>;
export declare const InverseReferenceTypeString: Record<string, ReferenceType>;
export declare const InverseHeapTypeString: Record<string, ReferenceType>;
export declare const LexInverseReferenceTypeString: Record<string, ReferenceType>;
export declare const enum ValueType {
    I32 = -1,
    I64 = -2,
    F32 = -3,
    F64 = -4,
    V128 = -5,
    FunctionReference = -16,
    ExternalReference = -17
}
export declare const ValueTypeString: Record<ValueType, string>;
export declare const InverseValueTypeString: Record<string, ValueType>;
export declare const enum BlockType {
    I32 = -1,
    I64 = -2,
    F32 = -3,
    F64 = -4,
    V128 = -5,
    FunctionReference = -16,
    ExternalReference = -17,
    Void = -64
}
export declare const BlockTypeString: Record<BlockType, string>;
export declare const InverseBlockTypeString: Record<string, BlockType>;
export declare const enum ExternalType {
    Function = 0,
    Table = 1,
    Memory = 2,
    Global = 3
}
export declare const ExternalTypeString: Record<ExternalType, string>;
export declare const InverseExternalTypeString: Record<string, ExternalType>;
export interface FunctionType {
    params: ValueType[];
    results: ValueType[];
}
export interface ResizableLimits {
    min: number;
    max?: number;
}
export interface MemoryType {
    limits: ResizableLimits;
}
export interface TableType {
    referenceType: ReferenceType;
    limits: ResizableLimits;
}
export interface GlobalType {
    valueType: ValueType;
    mutable: boolean;
}
export declare const enum Opcode {
    Unreachable = 0,
    Nop = 1,
    Block = 2,
    Loop = 3,
    If = 4,
    Else = 5,
    End = 11,
    Br = 12,
    BrIf = 13,
    BrTable = 14,
    Return = 15,
    Call = 16,
    CallIndirect = 17,
    RefNull = 208,
    RefIsNull = 209,
    RefFunc = 210,
    Drop = 26,
    Select = 27,
    SelectWithType = 28,
    LocalGet = 32,
    LocalSet = 33,
    LocalTee = 34,
    GlobalGet = 35,
    GlobalSet = 36,
    TableGet = 37,
    TableSet = 38,
    TableInit = 64524,
    ElemDrop = 64525,
    TableCopy = 64526,
    TableGrow = 64527,
    TableSize = 64528,
    TableFill = 64529,
    I32Load = 40,
    I64Load = 41,
    F32Load = 42,
    F64Load = 43,
    I32Load8_S = 44,
    I32Load8_U = 45,
    I32Load16_S = 46,
    I32Load16_U = 47,
    I64Load8_S = 48,
    I64Load8_U = 49,
    I64Load16_S = 50,
    I64Load16_U = 51,
    I64Load32_S = 52,
    I64Load32_U = 53,
    I32Store = 54,
    I64Store = 55,
    F32Store = 56,
    F64Store = 57,
    I32Store8 = 58,
    I32Store16 = 59,
    I64Store8 = 60,
    I64Store16 = 61,
    I64Store32 = 62,
    MemorySize = 63,
    MemoryGrow = 64,
    MemoryInit = 64520,
    DataDrop = 64521,
    MemoryCopy = 64522,
    MemoryFill = 64523,
    I32Const = 65,
    I64Const = 66,
    F32Const = 67,
    F64Const = 68,
    I32Eqz = 69,
    I32Eq = 70,
    I32Ne = 71,
    I32Lt_S = 72,
    I32Lt_U = 73,
    I32Gt_S = 74,
    I32Gt_U = 75,
    I32Le_S = 76,
    I32Le_U = 77,
    I32Ge_S = 78,
    I32Ge_U = 79,
    I64Eqz = 80,
    I64Eq = 81,
    I64_ne = 82,
    I64Lt_S = 83,
    I64Lt_U = 84,
    I64Gt_S = 85,
    I64Gt_U = 86,
    I64Le_S = 87,
    I64Le_U = 88,
    I64Ge_S = 89,
    I64Ge_U = 90,
    F32Eq = 91,
    F32Ne = 92,
    F32Lt = 93,
    F32Gt = 94,
    F32Le = 95,
    F32Ge = 96,
    F64Eq = 97,
    F64Ne = 98,
    F64Lt = 99,
    F64Gt = 100,
    F64Le = 101,
    F64Ge = 102,
    I32Clz = 103,
    I32Ctz = 104,
    I32Popcnt = 105,
    I32Add = 106,
    I32Sub = 107,
    I32Mul = 108,
    I32Div_S = 109,
    I32Div_U = 110,
    I32Rem_S = 111,
    I32Rem_U = 112,
    I32And = 113,
    I32Or = 114,
    I32Xor = 115,
    I32Shl = 116,
    I32Shr_S = 117,
    I32Shr_U = 118,
    I32Rotl = 119,
    I32Rotr = 120,
    I64Clz = 121,
    I64Ctz = 122,
    I64Popcnt = 123,
    I64Add = 124,
    I64Sub = 125,
    I64Mul = 126,
    I64Div_S = 127,
    I64Div_U = 128,
    I64Rem_S = 129,
    I64Rem_U = 130,
    I64And = 131,
    I64Or = 132,
    I64Xor = 133,
    I64Shl = 134,
    I64Shr_S = 135,
    I64Shr_U = 136,
    I64Rotl = 137,
    I64Rotr = 138,
    F32Abs = 139,
    F32Neg = 140,
    F32Ceil = 141,
    F32Floor = 142,
    F32Trunc = 143,
    F32Nearest = 144,
    F32Sqrt = 145,
    F32Add = 146,
    F32Sub = 147,
    F32Mul = 148,
    F32Div = 149,
    F32Min = 150,
    F32Max = 151,
    F32Copysign = 152,
    F64Abs = 153,
    F64Neg = 154,
    F64Ceil = 155,
    F64Floor = 156,
    F64Trunc = 157,
    F64Nearest = 158,
    F64Sqrt = 159,
    F64Add = 160,
    F64Sub = 161,
    F64Mul = 162,
    F64Div = 163,
    F64Min = 164,
    F64Max = 165,
    F64Copysign = 166,
    I32WrapI64 = 167,
    I32TruncF32_S = 168,
    I32TruncF32_U = 169,
    I32TruncF64_S = 170,
    I32TruncF64_U = 171,
    I64ExtendI32_S = 172,
    I64ExtendI32_U = 173,
    I64TruncF32_S = 174,
    I64TruncF32_U = 175,
    I64TruncF64_S = 176,
    I64TruncF64_U = 177,
    F32ConvertI32_S = 178,
    F32ConvertI32_U = 179,
    F32ConvertI64_S = 180,
    F32ConvertI64_U = 181,
    F32DemoteF64 = 182,
    F64ConvertI32_S = 183,
    F64ConvertI32_U = 184,
    F64ConvertI64_S = 185,
    F64ConvertI64_U = 186,
    F64PromoteF32 = 187,
    I32ReinterpretF32 = 188,
    I64ReinterpretF64 = 189,
    F32ReinterpretF32 = 190,
    F64ReinterpretF64 = 191,
    I32Extend8_S = 192,
    I32Extend16_S = 193,
    I64Extend8_S = 194,
    I64Extend16_S = 195,
    I64Extend32_S = 196,
    I32TruncSatF32_S = 64512,
    I32TruncSatF32_U = 64513,
    I32TruncSatF64_S = 64514,
    I32TruncSatF64_U = 64515,
    I64TruncSatF32_S = 64516,
    I64TruncSatF32_U = 64517,
    I64TruncSatF64_S = 64518,
    I64TruncSatF64_U = 64519,
    V128Load = 64768,
    V128Load8x8_S = 64769,
    V128Load8x8_U = 64770,
    V128Load16x4_S = 64771,
    V128Load16x4_U = 64772,
    V128Load32x2_S = 64773,
    V128Load32x2_U = 64774,
    V128Load8Splat = 64775,
    V128Load16Splat = 64776,
    V128Load32Splat = 64777,
    V128Load64Splat = 64778,
    V128Load32Zero = 64860,
    V128Load64Zero = 64861,
    V128Store = 64779,
    V128Load8Lane = 64852,
    V128Load16Lane = 64853,
    V128Load32Lane = 64854,
    V128Load64Lane = 64855,
    V128Store8Lane = 64856,
    V128Store16Lane = 64857,
    V128Store32Lane = 64858,
    V128Store64Lane = 64859,
    V128Const = 64780,
    I8x16Shuffle = 64781,
    I8x16Swizzle = 64782,
    I8x16Splat = 64783,
    I16x8Splat = 64784,
    I32x4Splat = 64785,
    I64x2Splat = 64786,
    F32x4Splat = 64787,
    F64x2Splat = 64788,
    I8x16ExtractLane_S = 64789,
    I8x16ExtractLane_U = 64790,
    I8x16ReplaceLane = 64791,
    I16x8ExtractLane_S = 64792,
    I16x8ExtractLane_U = 64793,
    I16x8ReplaceLane = 64794,
    I32x4ExtractLane = 64795,
    I32x4ReplaceLane = 64796,
    I64x2ExtractLane = 64797,
    I64x2ReplaceLane = 64798,
    F32x4ExtractLane = 64799,
    F32x4ReplaceLane = 64800,
    F64x2ExtractLane = 64801,
    F64x2ReplaceLane = 64802,
    I8x16Eq = 64803,
    I8x16Ne = 64804,
    I8x16Lt_S = 64805,
    I8x16Lt_U = 64806,
    I8x16Gt_S = 64807,
    I8x16Gt_U = 64808,
    I8x16Le_S = 64809,
    I8x16Le_U = 64810,
    I8x16Ge_S = 64811,
    I8x16Ge_U = 64812,
    I16x8Eq = 64813,
    I16x8Ne = 64814,
    I16x8Lt_S = 64815,
    I16x8Lt_U = 64816,
    I16x8Gt_S = 64817,
    I16x8Gt_U = 64818,
    I16x8Le_S = 64819,
    I16x8Le_U = 64820,
    I16x8Ge_S = 64821,
    I16x8Ge_U = 64822,
    I32x4Eq = 64823,
    I32x4Ne = 64824,
    I32x4Lt_S = 64825,
    I32x4Lt_U = 64826,
    I32x4Gt_S = 64827,
    I32x4Gt_U = 64828,
    I32x4Le_S = 64829,
    I32x4Le_U = 64830,
    I32x4Ge_S = 64831,
    I32x4Ge_U = 64832,
    I64x2Eq = 64982,
    I64x2Ne = 64983,
    I64x2Lt_S = 64984,
    I64x2Gt_S = 64985,
    I64x2Le_S = 64986,
    I64x2Ge_S = 64987,
    F32x4Eq = 64833,
    F32x4Ne = 64834,
    F32x4Lt = 64835,
    F32x4Gt = 64836,
    F32x4Le = 64837,
    F32x4Ge = 64838,
    F64x2Eq = 64839,
    F64x2Ne = 64840,
    F64x2Lt = 64841,
    F64x2Gt = 64842,
    F64x2Le = 64843,
    F64x2Ge = 64844,
    V128Not = 64845,
    V128And = 64846,
    V128Andnot = 64847,
    V128Or = 64848,
    V128Xor = 64849,
    V128Bitselect = 64850,
    V128AnyTrue = 64851,
    I8x16Abs = 64864,
    I8x16Neg = 64865,
    I8x16Popcnt = 64866,
    I8x16AllTrue = 64867,
    I8x16Bitmask = 64868,
    I8x16NarrowI16x8_S = 64869,
    I8x16NarrowI16x8_U = 64870,
    I8x16Shl = 64875,
    I8x16Shr_S = 64876,
    I8x16Shr_U = 64877,
    I8x16Add = 64878,
    I8x16AddSat_S = 64879,
    I8x16AddSat_U = 64880,
    I8x16Sub = 64881,
    I8x16SubSat_S = 64882,
    I8x16SubSat_U = 64883,
    I8x16Min_S = 64886,
    I8x16Min_U = 64887,
    I8x16Max_S = 64888,
    I8x16Max_U = 64889,
    I8x16Avgr_U = 64891,
    I16x8ExtaddPairwiseI8x16_S = 64892,
    I16x8ExtaddPairwiseI8x16_U = 64893,
    I16x8Abs = 64896,
    I16x8Neg = 64897,
    I16x8Q15mulrSat_S = 64898,
    I16x8AllTrue = 64899,
    I16x8Bitmask = 64900,
    I16x8NarrowI32x4_S = 64901,
    I16x8NarrowI32x4_U = 64902,
    I16x8ExtendLowI8x16_S = 64903,
    I16x8ExtendHighI8x16_S = 64904,
    I16x8ExtendLowI8x16_U = 64905,
    I16x8ExtendHighI8x16_U = 64906,
    I16x8Shl = 64907,
    I16x8Shr_S = 64908,
    I16x8Shr_U = 64909,
    I16x8Add = 64910,
    I16x8AddSat_S = 64911,
    I16x8AddSat_U = 64912,
    I16x8Sub = 64913,
    I16x8SubSat_S = 64914,
    I16x8SubSat_U = 64915,
    I16x8Mul = 64917,
    I16x8Min_S = 64918,
    I16x8Min_U = 64919,
    I16x8Max_S = 64920,
    I16x8Max_U = 64921,
    I16x8Avgr_U = 64923,
    I16x8ExtmulLowI8x16_S = 64924,
    I16x8ExtmulHighI8x16_S = 64925,
    I16x8ExtmulLowI8x16_U = 64926,
    I16x8ExtmulHighI8x16_U = 64927,
    I32x4ExtaddPairwiseI16x8_S = 64894,
    I32x4ExtaddPairwiseI16x8_U = 64895,
    I32x4Abs = 64928,
    I32x4Neg = 64929,
    I32x4AllTrue = 64931,
    I32x4Bitmask = 64932,
    I32x4ExtendLowI16x8_S = 64935,
    I32x4ExtendHighI16x8_S = 64936,
    I32x4ExtendLowI16x8_U = 64937,
    I32x4ExtendHighI16x8_U = 64938,
    I32x4Shl = 64939,
    I32x4Shr_S = 64940,
    I32x4Shr_U = 64941,
    I32x4Add = 64942,
    I32x4Sub = 64945,
    I32x4Mul = 64949,
    I32x4Min_S = 64950,
    I32x4Min_U = 64951,
    I32x4Max_S = 64952,
    I32x4Max_U = 64953,
    I32x4DotI16x8_S = 64954,
    I32x4ExtmulLowI16x8_S = 64956,
    I32x4ExtmulHighI16x8_S = 64957,
    I32x4ExtmulLowI16x8_U = 64958,
    I32x4ExtmulHighI16x8_U = 64959,
    I64x2Abs = 64960,
    I64x2Neg = 64961,
    I64x2AllTrue = 64963,
    I64x2Bitmask = 64964,
    I64x2ExtendLowI32x4_S = 64967,
    I64x2ExtendHighI32x4_S = 64968,
    I64x2ExtendLowI32x4_U = 64969,
    I64x2ExtendHighI32x4_U = 64970,
    I64x2Shl = 64971,
    I64x2Shr_S = 64972,
    I64x2Shr_U = 64973,
    I64x2Add = 64974,
    I64x2Sub = 64977,
    I64x2Mul = 64981,
    I64x2ExtmulLowI32x4_S = 64988,
    I64x2ExtmulHighI32x4_S = 64989,
    I64x2ExtmulLowI32x4_U = 64990,
    I64x2ExtmulHighI32x4_U = 64991,
    F32x4Ceil = 64871,
    F32x4Floor = 64872,
    F32x4Trunc = 64873,
    F32x4Nearest = 64874,
    F32x4Abs = 64992,
    F32x4Neg = 64993,
    F32x4Sqrt = 64995,
    F32x4Add = 64996,
    F32x4Sub = 64997,
    F32x4Mul = 64998,
    F32x4Div = 64999,
    F32x4Min = 65000,
    F32x4Max = 65001,
    F32x4Pmin = 65002,
    F32x4Pmax = 65003,
    F64x2Ceil = 64884,
    F64x2Floor = 64885,
    F64x2Trunc = 64890,
    F64x2Nearest = 64916,
    F64x2Abs = 65004,
    F64x2Neg = 65005,
    F64x2Sqrt = 65007,
    F64x2Add = 65008,
    F64x2Sub = 65009,
    F64x2Mul = 65010,
    F64x2Div = 65011,
    F64x2Min = 65012,
    F64x2Max = 65013,
    F64x2Pmin = 65014,
    F64x2Pmax = 65015,
    I32x4TruncSatF32x4_S = 65016,
    I32x4TruncSatF32x4_U = 65017,
    F32x4ConvertI32x4_S = 65018,
    F32x4ConvertI32x4_U = 65019,
    I32x4TruncSatF64x2_SZero = 65020,
    I32x4TruncSatF64x2_UZero = 65021,
    F64x2ConvertLowI32x4_S = 65022,
    F64x2ConvertLowI32x4_U = 65023,
    F32x4DemoteF64x2Zero = 64862,
    F64x2PromoteLowF32x4 = 64863
}
export declare const Opstring: Record<Opcode, string>;
export declare const InverseOpString: Record<string, Opcode>;
export declare const OpcodePrefixes: number[];
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
    bytes?: Uint8Array;
}
export interface Instruction {
    opcode: Opcode;
    immediates: Immediates;
}
export interface MemoryArgument {
    offset: number;
    align: number;
}
export interface TerminatingEndInstruction extends Instruction {
    opcode: Opcode.End;
}
export declare const TerminatingEndInstruction: TerminatingEndInstruction;
export declare type InstructionExpression = [...Instruction[], TerminatingEndInstruction];
export declare const enum SectionId {
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
export declare const SectionName: Record<SectionId, string>;
export declare const InverseSectionName: Record<string, SectionId>;
export declare type ImportEntry = {
    module: string;
    name: string;
    type: ExternalType;
} & ({
    type: ExternalType.Function;
    description: FunctionDescription;
} | {
    type: ExternalType.Table;
    description: TableType;
} | {
    type: ExternalType.Memory;
    description: MemoryType;
} | {
    type: ExternalType.Global;
    description: GlobalType;
});
export interface FunctionDescription {
    typeIndex: number;
}
export interface GlobalEntry {
    type: GlobalType;
    initialization: InstructionExpression;
}
export declare type ExportEntry = {
    name: string;
    type: ExternalType;
} & ({
    type: ExternalType.Function;
    description: {
        functionIndex: number;
    };
} | {
    type: ExternalType.Table;
    description: {
        tableIndex: number;
    };
} | {
    type: ExternalType.Memory;
    description: {
        memoryIndex: number;
    };
} | {
    type: ExternalType.Global;
    description: {
        globalIndex: number;
    };
});
export declare const enum ElementSegmentMode {
    Active = 0,
    Passive = 1,
    Declarative = 2
}
export declare const ElementSegmentModeString: Record<ElementSegmentMode, string>;
export declare const InverseElementSegmentModeString: Record<string, ElementSegmentMode>;
export declare const enum ElementKind {
    FunctionReference = 0
}
export declare const ElementKindString: Record<ElementKind, string>;
export declare const InverseElementKindString: Record<string, ElementKind>;
export interface ElementSegment {
    mode: ElementSegmentMode;
    tableIndex: number;
    type: ReferenceType | ElementKind;
    initialization: number[] | InstructionExpression[];
    offset?: InstructionExpression;
}
export interface FunctionCode {
    locals: ValueType[];
    body: InstructionExpression;
}
export declare const enum DataSegmentMode {
    Active = 0,
    Passive = 1,
    ActiveWithMemoryIndex = 2
}
export declare const DataSegmentModeString: Record<DataSegmentMode, string>;
export declare const InverseDataSegmentModeString: Record<string, BlockType>;
export declare type DataSegment = {
    mode: DataSegmentMode;
    initialization: Uint8Array;
} & ({
    mode: DataSegmentMode.Active;
    memoryIndex: number;
    offset: InstructionExpression;
} | {
    mode: DataSegmentMode.Passive;
} | {
    mode: DataSegmentMode.ActiveWithMemoryIndex;
    memoryIndex: number;
    offset: InstructionExpression;
});
export declare const SectionOrder: SectionId[];
export interface WasmFunction {
    typeIndex: number;
    locals: ValueType[];
    body: InstructionExpression;
}
export interface WasmModule {
    readonly types: FunctionType[];
    readonly functions: WasmFunction[];
    readonly tables: TableType[];
    readonly memories: MemoryType[];
    readonly globals: GlobalEntry[];
    readonly elements: ElementSegment[];
    readonly datas: DataSegment[];
    readonly start: number | null;
    readonly imports: ImportEntry[];
    readonly exports: ExportEntry[];
    readonly customSections: Record<string, Uint8Array[]>;
}
export declare const LexKeywords: string[];
export declare const LexIntRegex: RegExp;
export declare const LexFloatRegex: RegExp;
