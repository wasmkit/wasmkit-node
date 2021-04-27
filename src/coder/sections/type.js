const WASMReader = require('../wasm_reader');

class TypeSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const types = this.array(() => {
            const type = this.readTypeEnc();
            if (type !== 'func') return { type, params: null, results: null };

            const params = this.array(() => this.readTypeEnc());

            // Length of results should always be one, unless multiple results is allowed
            if (this.buffer[this.at] !== 1 && !options.multiResult) throw new SyntaxError('Only one result per function');

            const results = this.array(() => this.readTypeEnc());

            return {
                type,
                params,
                results
            }
        });

        return types;
    }

}

module.exports = TypeSectionParser;