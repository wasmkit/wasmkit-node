const WASMReader = require('../wasm_reader');

class CodeSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const bodies = this.array((i) => {// function bodies
            const bodyBytes = this.byteArray();

            const codeReader = new WASMReader(bodyBytes);

            const locals = codeReader.array(function () {
                return Array(this.vu32()).fill(this.readTypeEnc())
            }).flat();

            while (codeReader.at < codeReader.buffer.byteLength - 1) {
                codeReader.at++;
            };

            if (codeReader.u8() !== 0x0B /* end op code */) codeReader.parseError('`end` required at the end of the code');

            return {
                bodyBytes,
                locals,
                instructions: null
            }
        });

        return bodies;
    }

}

module.exports = CodeSectionParser;