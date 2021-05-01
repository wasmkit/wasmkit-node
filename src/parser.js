const WASMReader = require('./wasm_reader');
const SectionParsers = require('./sections');
const { SECTIONS } = require('./const');


class WASMParser extends WASMReader {
    parse() {
        this.at = 0;
        this.size = this.buffer.byteLength;

        if (this.endianSwap(this.i32()) !== 0x0061736D) return this.parseError('Invalid magic num');

        const version = this.i32();

        if (version !== 1) return this.parseError('Invalid version');

        const wasm = {
            version,
            sections: []
        }

        while (this.at < this.size) {
            const id = this.u8();
            const bytes = this.byteArray();

            const name = SECTIONS[id];

            if (!name) this.parseError(`No name ${id} or unmonitored section`);

            try {
                if (!SectionParsers[name]) {// Examples would be Custom Sections like `name`
                    wasm.sections.push({
                        id,
                        name,
                        bytes,
                        data: null
                    });
                    continue;
                }

                // A specific parser for each section
                const parser = new SectionParsers[name](bytes);

                wasm.sections.push({
                    id,
                    name,
                    bytes,
                    data: parser.parse()
                })
            } catch (err) {
                this.parseError(err);
            }
        }

        wasm.getSection = (wantedId) => wasm.sections.find(({ id }) => id === wantedId);

        return wasm;
    }
}

module.exports = WASMParser;