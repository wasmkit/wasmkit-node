const chalk = require('chalk');
const Reader = require('./reader');
const { TYPE_ENC } = require('./const')

class WASMReader extends Reader {
    readTypeEnc() {
        let code = this.vs7();

        let name = TYPE_ENC[code];
        if (!name) {
            throw new SyntaxError('Invalid Type Encoding ' + (this.buffer[this.at - 1]).toString(16));
        }
        return name
    }
    readInitializer() {
        if (this.readInstruction) throw new Error('Update this code');

        const opcode = this.vu32();

        if (opcode === 0x41) { // i32.const
            const out = {
                type: "i32.const",
                op: 0x41,
                value: this.vu32()
            }
            // end appended to all
            if (this.vu32() !== 0x0B) this.parseError('Expected 0x0B `end` after instantiation time initializor');

            return out;
        } else if (opcode === 0x23) { // global.get
            const out = {
                type: "global.get",
                op: 0x23,
                index: this.vu32(),
            };
            // end appended to all
            if (this.vu32() !== 0x0B) this.parseError('Expected 0x0B `end` after instantiation time initializor');

            return out;
        } else if (opcode === 0x0B) { // end
            return null;
        } else this.parseError('Invalid memnonic for instantiation time initializor');

    }
    parseError(err, tolerate = false) {
        let msg = this.constructor.name + " " + (err.message || err);
        console.log(chalk.red.bold(msg + " @" + this.lastAt.toString(16).padStart(4, "0")) + "\n");
        // console.log(chalk.red(Array.from(this.buffer.subarray(this.lastAt, this._at)).map(r => r.toString(16).padStart(2, "0")).join(' ')))

        if (!tolerate) throw err;
    }
}
module.exports = WASMReader;