const WASMReader = require('../wasm_reader');

class ElementSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const tableInitializors = this.array(() => {
            const tableInitializor = {
                index: this.vu(),
            }
            // TODO: Implement this into memnonic time initializor method
            tableInitializor.offset = this.readInstruction(); // instruction reader required
            this.readInstruction(); //
            // Its elem-type is alawys `func-ref`, so we'll call it funcs
            tableInitializor.funcs = this.array(() => this.vu32());
            return tableInitializor;
        });

        return tableInitializors;
    }

}

module.exports = ElementSectionParser;