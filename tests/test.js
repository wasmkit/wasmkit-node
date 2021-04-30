const fs = require("fs");
const WASMParser = require('..');

const testWasm = Uint8Array.from(fs.readFileSync(__dirname + '/test.wasm'));

console.log('Valid wasm? ' + (WebAssembly.validate(testWasm)) ? 'yes' : 'no');

const p = new WASMParser(testWasm);

const wasm = p.parse();

for (let section of wasm.sections) {
    console.log(section.name, section.bytes, section.data);
}

