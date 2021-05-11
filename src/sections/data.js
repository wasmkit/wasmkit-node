const WASMReader = require('../wasm_reader');

// For reference: github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#data-section
class DataSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const dataContents = this.array(() => ({
            index: this.vu32(), // memory specified
            offset: this.readInitializer(),
            data: this.byteArray()
        }));

        return dataContents;
    }

}

module.exports = DataSectionParser;