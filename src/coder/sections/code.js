const WASMReader = require('../wasm_reader');

class CodeSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const bodies = this.array(() => {// function bodies
            const bodyBytes = this.byteArray();

            const codeReader = new WASMReader(bodyBytes);

            const locals = codeReader.array(function () {
                return codeReader.array(function () {
                    return this.readTypeEnc()
                });
            }).flat();

            codeReader.at = codeReader.buffer.byteLength - 1;

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