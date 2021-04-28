const WASMReader = require('./wasm_reader');
const SectionParsers = require('./sections/')
const { SECTIONS } = require('./const')


class Parser extends WASMReader {
    parse() {
        this.at = 0;
        this.size = this.buffer.byteLength;

        if (this.endianSwap(this.i32()) !== 0x0061736D) return this.parseError('Invalid magic num');
        if (this.i32() !== 1) return this.parseError('Invalid version');

        const wasm = {
            version: 1,
            sections: []
        }

        while (this.at < this.size) {

            const id = this.u8();

            const bytes = this.byteArray();
            if (this.at >= this.size) break;
            const name = SECTIONS[id];
            if (!name) this.parseError('No name ' + id + ' or unmonitored section');
            try {
                if (!SectionParsers[name]) {
                    wasm.sections.push({
                        id,
                        name,
                        bytes: bytes,
                        data: null
                    });
                    continue;
                }

                const parser = new SectionParsers[name](bytes);

                wasm.sections.push({
                    id,
                    name,
                    bytes: parser.buffer,
                    data: parser.parse()
                })
            } catch (err) {
                this.parseError(err);
            }
        }


        return wasm;
    }
}

module.exports = Parser;