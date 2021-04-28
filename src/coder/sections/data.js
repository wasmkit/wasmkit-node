const WASMReader = require('../wasm_reader');

class DataSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const dataContents = this.array(() => {
            return {
                index: this.vu32(), // memory specified
                offset: this.readInitializer(),
                data: this.byteArray()
            }
        });

        return dataContents;
    }

}

module.exports = DataSectionParser;