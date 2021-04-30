const WASMReader = require('../wasm_reader');

// For reference: github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#function-section
class FunctionSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const functions = this.array(() => {
            return this.vu32()
        });

        return functions;
    }

}

module.exports = FunctionSectionParser;