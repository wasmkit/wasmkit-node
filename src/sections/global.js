const WASMReader = require('../wasm_reader');

// For reference: github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#global-section
class GlobalSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const globals = this.array(() => {
            const global = {
                fields: { type: this.readTypeEnc(), mutable: this.vu1() },
                initial: this.readInitializer()
            };

            return global;
        });

        return globals;
    }

}

module.exports = GlobalSectionParser;
