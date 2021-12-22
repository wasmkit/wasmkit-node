import * as constants from "./src/const";
declare const _default: {
    parseBinary: (buffer: Uint8Array) => constants.WasmModule;
    buildBinary: (wasmModule: constants.WasmModule) => Uint8Array;
    constants: typeof constants;
};
export default _default;
