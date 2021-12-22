# wasmkit

Web Assembly toolkit api for node javascript.

## Installation

```
npm install wasmkit
```

## Building from Source
```
npm run build
```

## Usage

```js
import { parseBinary, constants: { ValueType }}

const wasmModule = parseBinary(...);

wasmModule.functions[0].locals.push(ValueType.I32);

const modifiedWasmBinary = buildBinary(wasmModule);

WebAssembly.validate(modifiedWasmBinary);
```

## Spec Compliancy
Spec compliant as of [Release 1.1 (2021-12-02)](https://webassembly.github.io/spec/core/_download/WebAssembly.pdf)

## Looking for earlier versions? 

- [`vALPHA`](https://github.com/wasmkit/wasmkit-node/tree/vALPHA-archive)
- [`vBETA`](https://github.com/wasmkit/wasmkit-node/tree/vBETA-archive)
- [`vGAMMA`](https://github.com/wasmkit/wasmkit-node/tree/vGAMMA-archive)
