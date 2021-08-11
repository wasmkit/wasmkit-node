type BufferResolvable = ArrayBuffer | Uint8Array;

type valueType = "i32" | "i64" | "f32" | "f64" | "funcref" | "func" | "void";
type variableValueType = "i32" | "i64" | "f32" | "f64";

type Signature = {
    index: number;
    params: variableValueType[];
    results: variableValueType[];
};
type Import = { moduleName: string; exportName: string; } & (({ kind: "func" } & Function) |
    ({ kind: "table" } & Table) |
    ({ kind: "memory" } & Memory) |
    ({ kind: "global" } & Global));
type Function = {
    signatureIndex: number;
};
type Table = {
    elementType: "funcref";
    initial: number;
    maximum?: number;
};
type Memory = {
    initial: number;
    maximum?: number;
    shared: boolean;
};
type GlobalRaw = {
    type: variableValueType;
    mutable: boolean
};
type Global = GlobalRaw & {
    initializer: Instruction | null;
};
type Start = {
    index: number;
};
type Export = {
    name: string;
    kind: kind;
    index: number;
}
type Element = {
    index: number;
    offset: Instruction | null;
    elems: number[]
}
type CodeBody = {
    locals: variableValueType[],
    instructions: Instruction[]
}
type Data = {
    index: number;
    offset: Instruction | null;
    data: Uint8Array;
}

type Immediates = { value: number | bigint } | { signature: valueType } | 
    { id: number } | { depth: number } |
    { depthTable: number[]; defaultDepth: number } | { callee: number } |
    { signatureIndex: number; reserved: number } | { reserved: number } | 
    { align: number; offset: number }

type kind = "func" | "table" | "memory" | "global";

enum SECTION {
    CUSTOM,
    SIGNATURE,
    IMPORT,
    FUNCTION,
    TABLE,
    MEMORY,
    GLOBAL,
    EXPORT,
    START,
    ELEMENT,
    CODE,
    DATA,
    DATACOUNT,
}

declare namespace OP {
    const UNREACHABLE: number;
    const NOP: number;
    const BLOCK: number;
    const LOOP: number;
    const IF: number;
    const ELSE: number;
    const END: number;
    const BR: number;
    const BR_IF: number;
    const BR_TABLE: number;
    const RETURN: number;
    const CALL: number;
    const CALL_INDIRECT: number;
    const DROP: number;
    const SELECT: number;
    const GET_LOCAL: number;
    const SET_LOCAL: number;
    const TEE_LOCAL: number;
    const GET_GLOBAL: number;
    const SET_GLOBAL: number;
    const I32_LOAD: number;
    const I64_LOAD: number;
    const F32_LOAD: number;
    const F64_LOAD: number;
    const I32_LOAD8_S: number;
    const I32_LOAD8_U: number;
    const I32_LOAD16_S: number;
    const I32_LOAD16_U: number;
    const I64_LOAD8_S: number;
    const I64_LOAD8_U: number;
    const I64_LOAD16_S: number;
    const I64_LOAD16_U: number;
    const I64_LOAD32_S: number;
    const I64_LOAD32_U: number;
    const I32_STORE: number;
    const I64_STORE: number;
    const F32_STORE: number;
    const F64_STORE: number;
    const I32_STORE8: number;
    const I32_STORE16: number;
    const I64_STORE8: number;
    const I64_STORE16: number;
    const I64_STORE32: number;
    const MEMORY_SIZE: number;
    const MEMORY_GROW: number;
    const I32_CONST: number;
    const I64_CONST: number;
    const F32_CONST: number;
    const F64_CONST: number;
    const I32_EQZ: number;
    const I32_EQ: number;
    const I32_NE: number;
    const I32_LT_S: number;
    const I32_LT_U: number;
    const I32_GT_S: number;
    const I32_GT_U: number;
    const I32_LE_S: number;
    const I32_LE_U: number;
    const I32_GE_S: number;
    const I32_GE_U: number;
    const I64_EQZ: number;
    const I64_EQ: number;
    const I64_NE: number;
    const I64_LT_S: number;
    const I64_LT_U: number;
    const I64_GT_S: number;
    const I64_GT_U: number;
    const I64_LE_S: number;
    const I64_LE_U: number;
    const I64_GE_S: number;
    const I64_GE_U: number;
    const F32_EQ: number;
    const F32_NE: number;
    const F32_LT: number;
    const F32_GT: number;
    const F32_LE: number;
    const F32_GE: number;
    const F64_EQ: number;
    const F64_NE: number;
    const F64_LT: number;
    const F64_GT: number;
    const F64_LE: number;
    const F64_GE: number;
    const I32_CLZ: number;
    const I32_CTZ: number;
    const I32_POPCNT: number;
    const I32_ADD: number;
    const I32_SUB: number;
    const I32_MUL: number;
    const I32_DIV_S: number;
    const I32_DIV_U: number;
    const I32_REM_S: number;
    const I32_REM_U: number;
    const I32_AND: number;
    const I32_OR: number;
    const I32_XOR: number;
    const I32_SHL: number;
    const I32_SHR_S: number;
    const I32_SHR_U: number;
    const I32_ROTL: number;
    const I32_ROTR: number;
    const I64_CLZ: number;
    const I64_CTZ: number;
    const I64_POPCNT: number;
    const I64_ADD: number;
    const I64_SUB: number;
    const I64_MUL: number;
    const I64_DIV_S: number;
    const I64_DIV_U: number;
    const I64_REM_S: number;
    const I64_REM_U: number;
    const I64_AND: number;
    const I64_OR: number;
    const I64_XOR: number;
    const I64_SHL: number;
    const I64_SHR_S: number;
    const I64_SHR_U: number;
    const I64_ROTL: number;
    const I64_ROTR: number;
    const F32_ABS: number;
    const F32_NEG: number;
    const F32_CEIL: number;
    const F32_FLOOR: number;
    const F32_TRUNC: number;
    const F32_NEAREST: number;
    const F32_SQRT: number;
    const F32_ADD: number;
    const F32_SUB: number;
    const F32_MUL: number;
    const F32_DIV: number;
    const F32_MIN: number;
    const F32_MAX: number;
    const F32_COPYSIGN: number;
    const F64_ABS: number;
    const F64_NEG: number;
    const F64_CEIL: number;
    const F64_FLOOR: number;
    const F64_TRUNC: number;
    const F64_NEAREST: number;
    const F64_SQRT: number;
    const F64_ADD: number;
    const F64_SUB: number;
    const F64_MUL: number;
    const F64_DIV: number;
    const F64_MIN: number;
    const F64_MAX: number;
    const F64_COPYSIGN: number;
    const I32_WRAP_I64: number;
    const I32_TRUNC_S_F32: number;
    const I32_TRUNC_U_F32: number;
    const I32_TRUNC_S_F64: number;
    const I32_TRUNC_U_F64: number;
    const I64_EXTEND_S_I32: number;
    const I64_EXTEND_U_I32: number;
    const I64_TRUNC_S_F32: number;
    const I64_TRUNC_U_F32: number;
    const I64_TRUNC_S_F64: number;
    const I64_TRUNC_U_F64: number;
    const F32_CONVERT_S_I32: number;
    const F32_CONVERT_U_I32: number;
    const F32_CONVERT_S_I64: number;
    const F32_CONVERT_U_I64: number;
    const F32_DEMOTE_F64: number;
    const F64_CONVERT_S_I32: number;
    const F64_CONVERT_U_I32: number;
    const F64_CONVERT_S_I64: number;
    const F64_CONVERT_U_I64: number;
    const F64_PROMOTE_F32: number;
    const I32_REINTERPRET_F32: number;
    const I64_REINTERPRET_F64: number;
    const F32_REINTERPRET_I32: number;
    const F64_REINTERPRET_I64: number;
    const I32_EXTEND8_S: number;
    const I32_EXTEND16_S: number;
    const I64_EXTEND8_S: number;
    const I64_EXTEND16_S: number;
    const I64_EXTEND32_S: number;
}

declare class Instruction {
    static readFrom(reader: Reader): Instruction;

    constructor(opcode: number, immediates: Immediates);

    opcode: number;
    opstr: string;
    immediates: Immediatesy;
}

declare class Reader {
    static endianSwap(int: number): number;

    constructor(buffer: BufferResolvable);

    buffer: Uint8Array;

    _at: number;
    _previous: number;

    set at(arg: number);
    get at(): number;

    uint8(): number;
    uint16(): number;
    uint32(): number;
    int32(): number;
    float(): number;
    double(): number;
    bool(): boolean;
    vu32(): number;
    vu64(): bigint;

    byteArray(length?: number): Uint8Array;
    array(readFunc: () => any, length?: number): any[];
    string(length?: number): string;

    readInstruction(): Instruction;
    readInitializer(): Instruction | null;
    reject(msg: string): void;
}

export function parseWASM(buffer: BufferResolvable, options?: {
    multiResult: boolean;
    sharedMemory: boolean;
    mutableGlobals: boolean;
    sections: SECTION[];
}): {
    version: number;
    sections: {
        customs: Record<string, Uint8Array>;
        signature: null | Signature[];
        import: null | Import[];
        function: null | Function[];
        table: null | Table[];
        memory: null | Memory[];
        global: null | Global[];
        export: null | Export[];
        start: null | Start;
        element: null | Element[];
        code: null | CodeBody[];
        data: null | Data[];
        dataCount: Uint8Array;
    };
};

export namespace parseWASM {
    export { OP };
    export { SECTION };
    export { Reader };
    export { Instruction };
}
