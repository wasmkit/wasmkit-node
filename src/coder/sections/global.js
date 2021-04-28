const WASMReader = require('../wasm_reader');

class GlobalSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const globals = this.array(() => {
            const global = {
                desc: { type: this.readTypeEnc(), mutable: this.vu1() },
                initial: this.readInitializer()
            };

            return global;
        });

        return globals;
    }

}

module.exports = GlobalSectionParser;
