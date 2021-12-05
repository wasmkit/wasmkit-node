export declare const enum NumberType {
    I32 = -1,
    I64 = -2,
    F32 = -3,
    F64 = -4
}
export declare const NumberTypeString: Record<NumberType, string>;
export declare const enum ReferenceType {
    FunctionReference = -16,
    ExternalReference = -17
}
export declare const ReferenceTypeString: Record<ReferenceType, string>;
export declare const enum ValueType {
    I32 = -1,
    I64 = -2,
    F32 = -3,
    F64 = -4,
    FunctionReference = -16,
    ExternalReference = -17
}
export declare const ValueTypeString: Record<ValueType, string>;
export declare const enum BlockType {
    I32 = -1,
    I64 = -2,
    F32 = -3,
    F64 = -4,
    FunctionReference = -16,
    ExternalReference = -17,
    Void = -64
}
export declare const BlockTypeString: Record<BlockType, string>;
export declare const enum ExternalType {
    Function = 0,
    Table = 1,
    Memory = 2,
    Global = 3
}
export declare const ExternalTypeString: Record<ExternalType, string>;
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
    I64TruncSatF64_U = 64519
}
export declare const Opstring: Record<Opcode, string>;
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
}
export interface Instruction {
    opcode: Opcode;
    opstring: string;
    immediates: Immediates;
}
export interface MemoryArgument {
    offset: number;
    align: number;
}
export declare type TerminatingEndInstruction = {
    opcode: Opcode.End;
} & Instruction;
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
export declare const enum ElementKind {
    FunctionReference = 0
}
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
export declare class WasmReader {
    private buffer;
    at: number;
    constructor(buffer: ArrayBuffer);
    readByte(): number;
    readSignedByte(): number;
    readInt32(): number;
    readUint32(): number;
    readInt64(): bigint;
    readFloat32(): number;
    readFloat64(): number;
    readName(): string;
    readByteVector(length?: number): Uint8Array;
    readVector<ElementType>(elementReadFunc: () => ElementType, length?: number): ElementType[];
    readFunctionType(): FunctionType;
    readLimits(flags?: number): ResizableLimits;
    readMemoryType(): MemoryType;
    readTableType(): TableType;
    readGlobalType(): GlobalType;
    readInstruction(): Instruction;
    readInstructionExpression(): InstructionExpression;
    readTypeEntry(): FunctionType;
    readImportEntry(): ImportEntry;
    readFunctionEntry(): FunctionDescription;
    readTableEntry(): TableType;
    readMemoryEntry(): MemoryType;
    readGlobalEntry(): GlobalEntry;
    readExportEntry(): ExportEntry;
    readElementEntry(): ElementSegment;
    readCodeEntry(): FunctionCode;
    readDataEntry(): DataSegment;
    inBuffer(): boolean;
    assert(check: boolean, message: string): void;
}
export declare class WasmModule {
    static readonly VERSION = "v1.0.9";
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
    private constructor();
    static decodeFrom(buffer: Uint8Array): WasmModule;
}
export declare const WasmParser: typeof WasmModule;
