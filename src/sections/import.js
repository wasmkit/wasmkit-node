const WASMReader = require('../wasm_reader');
// For reference: github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#import-section
const { EXTERNAL_KIND, TABLE_ELEM_TYPES } = require('../const')

class ImportSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const imports = this.array(() => {
            const importDef = {
                moduleName: this.string(),
                exportName: this.string(),
                kind: EXTERNAL_KIND[this.u8()],
                data: {},
            }

            switch (importDef.kind) {
                case "func": {
                    importDef.data.signature = this.vu32();
                    break;
                }
                case "table": {
                    const type = this.readTypeEnc();

                    if (!TABLE_ELEM_TYPES.includes(type)) this.parseError('Invalid element type `' + type + '` for table');

                    const data = {
                        flags: this.vu32(),
                        initial: this.vu32(),
                        type,
                    }

                    if (data.flags & 1) data.maximum = this.vu32();
                    if (data.minimum > data.maximum) this.parseError('Resizable limit minimum MUST be less than the maximum');

                    importDef.data = data;
                    break;
                }
                case "memory": {
                    const data = {
                        flags: this.vu32(),
                        initial: this.vu32()
                    }

                    if (data.flags & 1) data.maximum = this.vu32();
                    data.shared = data.flags & 2;

                    if (data.shared && !options.sharedMemory) this.parseError('Shared memory is not supported by current options');
                    if (data.initial > data.maximum) this.parseError('Resizable limit minimum MUST be less than the maximum');

                    importDef.data = data;
                    break;
                }
                case "global": {
                    const type = this.readTypeEnc();

                    importDef.data.type = type;
                    importDef.data.mutable = this.vu1();

                    break;
                }
                default:
                    this.parseError('Invalid External Kind')

            }

            return importDef
        });

        return imports;
    }

}

module.exports = ImportSectionParser;