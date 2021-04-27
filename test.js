const fs = require("fs");
const Parser = require('./src/coder/parser');

const testWasm = fs.readFileSync('./test.wasm');

console.log('WASM Validation : ' + WebAssembly.validate(testWasm));
const p = new Parser(Uint8Array.from(testWasm));
console.log(Array.from(Uint8Array.from(testWasm)).map(e => e.toString(16).padStart(2, "0")).join(' '))
console.log(p.parse().sections[0].data)

