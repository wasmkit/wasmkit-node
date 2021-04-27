const WASMReader = require('../wasm_reader');

const TABLE_ELEM_TYPES = [
    "funcref"
]
class TableSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const tableDescriptors = this.array(() => {
            const type = this.readTypeEnc();

            if (!TABLE_ELEM_TYPES.includes(type)) this.parseError('Invalid element type `' + type + '` for table')
            const fields = {
                flags: this.vu32(),
                initial: this.vu32()
            }
            if (fields.flags & 1) fields.maximum = this.vu32()
            if (fields.minimum > fields.maximum) this.parseError('Resizable limit minimum MUST be less than the maximum');

            return {
                fields,
                type
            }
        });

        return tableDescriptors;
    }

}

module.exports = TableSectionParser;