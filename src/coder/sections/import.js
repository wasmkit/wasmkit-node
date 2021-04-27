const WASMReader = require('../wasm_reader');

const EXTERNAL_KIND = [
    "func",
    "table",
    "memory",
    "global"
]

const TABLE_ELEM_TYPES = [
    "funcref"
]

class TypeSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const imports = this.array(() => {
            const importDef = {
                moduleName: this.string(),
                exportName: this.string(),
                kind: EXTERNAL_KIND[this.vu7()],
                fields: {},
            }
            switch (importDef.kind) {
                case "func":
                    importDef.fields.sigIndex = this.vu32()
                    break;
                case "table":
                    let type = this.readTypeEnc();

                    importDef.fields.elementType = type;
                    if (!TABLE_ELEM_TYPES.includes(type)) throw new SyntaxError('Invalid element type `' + type + '` for table')
                    let resizable = {
                        flags: this.vu32(),
                        initial: this.vu32()
                    }
                    if (resizable.flags & 1) resizable.maximum = this.vu32()
                    if (resizable.minimum > resizable.maximum) throw new SyntaxError('Resizable limit minimum MUST be less than the maximum')
                    importDef.fields.resizable = resizable;
                    break;
                case "memory":
                    const resizable = {
                        flags: this.vu32(),
                        initial: this.vu32()
                    }
                    if (resizable.flags & 1) resizable.maximum = this.vu32();
                    if (resizable.minimum > resizable.maximum) throw new SyntaxError('Resizable limit minimum MUST be less than the maximum');

                    importDef.fields.resizable = resizable;
                    break;
                case "global":
                    const type = this.readTypeEnc();
                    importDef.fields.type = type;
                    importDef.fields.mutable = this.vu1();
                    break;
                default:
                    throw new SyntaxError('Invalid External Kind')

            }

            return importDef
        });

        return imports;
    }

}

module.exports = TypeSectionParser;