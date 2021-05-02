const fs = require("fs");
const WASMParser = require('..');

const testWasm = Uint8Array.from(fs.readFileSync(__dirname + '/florrio.wasm'));

console.log('Valid wasm? ' + (WebAssembly.validate(testWasm)) ? 'yes' : 'no');

const p = new WASMParser(testWasm);

const wasm = p.parse();

for (let section of wasm.sections) {
    console.log(section.name, section.bytes, section.data);
}


console.log(wasm.getSection(0x02).data.slice(176))