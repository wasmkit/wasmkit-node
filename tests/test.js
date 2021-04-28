const fs = require("fs");
const WASMParser = require('../src/coder/parser');

const testWasm = fs.readFileSync(__dirname + '/test.wasm');

console.log('WASM Validation : ' + WebAssembly.validate(testWasm));

const p = new WASMParser(Uint8Array.from(testWasm));

console.log(p.parse())

