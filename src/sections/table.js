const WASMReader = require('../wasm_reader');

// For reference: github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#table-section

const { TABLE_ELEM_TYPES } = require('../const')
class TableSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const tableDescriptors = this.array(() => {
            const data = {
                type: this.readTypeEnc(),
            }

            if (!TABLE_ELEM_TYPES.includes(data.type)) this.parseError('Invalid element type `' + data.type + '` for table');

            data.flags = this.vu32();
            data.initial = this.vu32();

            if (data.flags & 1) data.maximum = this.vu32();
            if (data.minimum > data.maximum) this.parseError('Resizable limit minimum MUST be less than the maximum');

            return data;
        });

        return tableDescriptors;
    }

}

module.exports = TableSectionParser;