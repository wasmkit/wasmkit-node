const WASMReader = require('../wasm_reader');

class LinearMemorySectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const memoryDescriptors = this.array(() => {
            const fields = {
                flags: this.vu32(),
                initial: this.vu32()
            }
            if (fields.flags & 1) fields.maximum = this.vu32()
            if (fields.minimum > fields.maximum) return this.parseError('fields limit minimum MUST be less than the maximum');

            return fields
        });

        return memoryDescriptors;
    }

}

module.exports = LinearMemorySectionParser;