const WASMReader = require('../wasm_reader');

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