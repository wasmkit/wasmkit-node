const WASMReader = require('../wasm_reader');

// For reference: github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#element-section
class ElementSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const tableInitializors = this.array(() => ({
            index: this.vu32(),
            offset: this.readInitializer(),
            // Its elem-type is alawys `func-ref`, so we'll call it funcs
            funcs: this.array(() => this.vu32())
        }));

        return tableInitializors;
    }

}

module.exports = ElementSectionParser;