const WASMReader = require('../wasm_reader');

class TypeSectionParser extends WASMReader {
    parse() {
        let types = []
        let numTypes = types.length = this.vu32()
        for (let i = 0; i < numTypes; i++) {
            let type = this.readTypeEnc()
            if (type !== 'func') {
                types[i] = { type }
                continue;
            }
            let params = []
            let numParams = params.length = this.vu32();
            for (let i = 0; i < numParams; i++) {
                params[i] = this.readTypeEnc()
            }
            let results = []
            let numResults = results.length = this.vu32();
            if (numResults > 1) return this.parseError('Must have maximum `1` results for each function')
            for (let i = 0; i < numResults; i++) {
                results[i] = this.readTypeEnc()
            }
            types[i] = { type, params, results }
        }
        return {
            types
        }
    }
}

module.exports = TypeSectionParser;