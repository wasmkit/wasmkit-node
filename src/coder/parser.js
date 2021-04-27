const Reader = require('./reader');
const SectionParsers = require('./sections')
const chalk = require('chalk');

const SECTIONS = {
    0x1: "TypeSection",
    0x2: "ImportSection",
    0x3: "FunctionSection",
    0x4: "TableSection",
    0x5: "LinearMemorySection",
    0x6: "GlobalSection",
    0x7: "ExportSection",
    0x8: "StartSection",
    0x9: "ElementSection",
    0xA: "CodeSection",
    0xB: "DataSection",
}

class Parser extends Reader {
    parse() {
        this.at = 0;

        if (this.littleEndian(this.i32()) !== 0x00_61_73_6D) return this.parseError('Invalid magic num');
        if (this.i32() !== 1) return this.parseError('Invalid version');

        const wasm = {
            version: 1,
            sections: []
        }

        while (this.at < this.size) {
            const id = this.u8();
            const name = SECTIONS[id];
            if (!SectionParsers[name]) {
                wasm.sections.push({
                    id,
                    name,
                    bytes: this.byteArray(),
                    data: null
                });
                continue;
            }

            const parser = new SectionParsers[name](this.byteArray());

            wasm.sections.push({
                id,
                name,
                bytes: parser.buffer,
                data: parser.parse()
            })
        }

        return wasm;
    }

    parseError(msg) {
        console.log(chalk.red.bold(msg + "@" + this.at) + "\n");

        throw msg;
    }
}