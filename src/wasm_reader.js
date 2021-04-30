const chalk = require('chalk');
const Reader = require('./reader');
const { TYPE_ENC, OPCODE } = require('./const');
const Instruction = require('./instruction');

class WASMReader extends Reader {
    readTypeEnc() {
        let code = this.u8();

        let name = TYPE_ENC[code];
        if (!name) {
            throw new SyntaxError('Invalid Type Encoding ' + (this.buffer[this.at - 1]).toString(16));
        }
        return name
    }
    readInitializer() {
        // if (this.readInstruction) throw new Error('Update this code');

        const instruction = this.readInstruction();

        if (instruction.opcode === OPCODE.END) return null;
        if (this.readInstruction().opcode !== OPCODE.END) this.parseError('Expected 0x0B `end` after instantiation time initializor');

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