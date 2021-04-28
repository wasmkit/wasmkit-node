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
                initial: this.readInstruction() // instruction reader required
            };
            const end = this.readInstruction();
            if (end.type !== 'end') this.parseError('Unable to find ending for instantiation-time initializer')

            return global;
        });

        return globals;
    }

}

module.exports = GlobalSectionParser;
