const chalk = require('chalk');
const Reader = require('./reader');
const { TYPE_ENC, OPCODE } = require('./const');
const Instruction = require('./instruction');

class WASMReader extends Reader {
    readTypeEnc() {
        const code = this.u8();
        const name = TYPE_ENC[code];

        if (!name) {
            throw new SyntaxError('Invalid Type Encoding ' + (this.buffer[this.at - 1]).toString(16));
        }
        return name
    }
    readInitializer() {
        const instruction = this.readInstruction();

        // All instantiations end with an ending op
        if (instruction.opcode === OPCODE.END) return null;
        if (this.readInstruction().opcode !== OPCODE.END) this.parseError('Expected 0x0B `end` to terminate instantiation time initializor');

        return instruction;
    }

    readInstruction() {
        return Instruction.readFrom(this);
    }

    parseError(err, tolerate = false) {
        let msg = this.constructor.name + " " + (err.message || err);

        console.log(chalk.red.bold(msg + " @" + this.lastAt.toString(16).padStart(4, "0")) + "\n");

        if (!tolerate) throw err;
    }
}
module.exports = WASMReader;