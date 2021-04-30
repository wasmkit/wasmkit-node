const WASMReader = require('../wasm_reader');

// For reference: github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#element-section
class ElementSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const tableInitializors = this.array(() => {
            const tableInitializor = {
                index: this.vu32(),
            }
            tableInitializor.offset = this.readInitializer();
            // Its elem-type is alawys `func-ref`, so we'll call it funcs
            tableInitializor.funcs = this.array(() => this.vu32());
            return tableInitializor;
        });

        return tableInitializors;
    }

}

module.exports = ElementSectionParser;