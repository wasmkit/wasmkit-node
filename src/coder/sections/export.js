const WASMReader = require('../wasm_reader');
const EXTERNAL_KIND = [
    "func",
    "table",
    "memory",
    "global"
]
class ExportSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const wasmExports = this.array(() => {
            return {
                name: this.string(),
                kind: EXTERNAL_KIND[this.vu7()],
                index: this.vu32()
            }
        });

        return wasmExports;
    }

}

module.exports = ExportSectionParser;