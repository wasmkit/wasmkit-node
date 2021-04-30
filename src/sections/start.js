const WASMReader = require('../wasm_reader');

// For reference: github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#start-section
class StartSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        return {
            index: this.vu32()
        };
    }

}

module.exports = StartSectionParser;