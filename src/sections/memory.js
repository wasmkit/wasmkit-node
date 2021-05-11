const WASMReader = require('../wasm_reader');
// For reference: github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#linear-memory-section
class LinearMemorySectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const memoryDescriptors = this.array(() => {
            const data = {
                flags: this.vu32(),
                initial: this.vu32()
            }

            if (data.flags & 1) data.maximum = this.vu32();
            data.shared = data.flags & 2;

            if (data.shared && !options.sharedMemory) this.parseError('Shared memory is not supported by current options');

            if (data.initial > data.maximum) return this.parseError('Memory initial MUST be less than the maximum');

            return data
        });

        return memoryDescriptors;
    }

}

module.exports = LinearMemorySectionParser;