const Reader = require('./reader');
const TYPE_ENC = {
    "0": "void",
    "-1": "i32",
    "-2": "i64",
    "-3": "f32",
    "-4": "f64",
    "-16": "funcref",
    "-32": "func",
    "-40": "void"
}

class WASMReader extends Reader {
    readTypeEnc() {
        let code = this.vs7();
        let name = TYPE_ENC[code];
        if (!name) {
            throw new SyntaxError('Invalid Type Encoding');
        }
        return name
    }
}
module.exports = WASMReader;