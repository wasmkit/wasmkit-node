const util = require('util');
const WabtModule = require('./wabt');
const { WasmParser } = require("../dist/commonjs/parser");

WabtModule().then(function(wabt) {
    const text = `(module
        (import "console" "log" (func $console.log (param i32)))
  
        (func (export "logOne")
          i32.const 0
          call $console.log))`;
    const file = "simple.wat";

    const wat = wabt.parseWat(file, text)
    const {buffer} = wat.toBinary({});

    try {
        const wasmModule = WasmParser.parseModule(buffer);

        console.log(file + "\n\n" + text + "\n\n");
        console.log(util.inspect(wasmModule, false, 27, true));
    } catch (err) {
        console.log(err);
        console.log(buffer);
    }
});