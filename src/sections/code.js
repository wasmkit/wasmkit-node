const WASMReader = require('../wasm_reader');
// For reference: github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#code-section
class CodeSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const bodies = this.array(() => {
            const bodyBytes = this.byteArray();

            const codeReader = new WASMReader(bodyBytes);

            const locals = codeReader.array(function () {
                return Array(this.vu32()).fill(this.readTypeEnc());
            }).flat();

            const instructions = [];

            while (codeReader.at < codeReader.buffer.byteLength) {
                instructions.push(codeReader.readInstruction());
            };

            if (instructions[instructions.length - 1].opcode !== 0x0B /* end op code */) codeReader.parseError('`end` required at the end of the code');

            return {
                bodyBytes,
                locals,
                instructions
            }
        });

        return bodies;
    }

}

module.exports = CodeSectionParser;