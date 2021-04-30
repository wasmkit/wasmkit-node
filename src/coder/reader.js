// Object.getPrototypeOf(Uint8Array).prototype.read = function () {
//     return new Reader(this);
// }

class Reader {
    /** @private */
    static convo = new ArrayBuffer(8);
    /** @private */
    static u8 = new Uint8Array(Reader.convo);
    /** @private */
    static i8 = new Int8Array(Reader.convo);
    /** @private */
    static u16 = new Uint16Array(Reader.convo);
    /** @private */
    static i16 = new Int16Array(Reader.convo);
    /** @private */
    static u32 = new Uint32Array(Reader.convo);
    /** @private */
    static i32 = new Int32Array(Reader.convo);
    /** @private */
    static f32 = new Float32Array(Reader.convo);
    /** @private */
    static u64 = new BigUint64Array(Reader.convo);
    /** @private */
    static i64 = new BigInt64Array(Reader.convo);
    /** @private */
    static f64 = new Float64Array(Reader.convo);

    /** @protected */
    static UTF8 = (() => {
        let Decoder = new TextDecoder();
        let Encoder = new TextEncoder();

        return {
            encode(...args) {
                return Encoder.encode.apply(Endoer, args);
            },
            decode(...args) {
                return Decoder.decode.apply(Decoder, args);
            },
            encodeInto(...args) {
                return Encoder.encodeInto.apply(Encoder, args);
            }
        }
    })();

    /**
     * @protected
     */
    static endianSwap(int) {
        return (((int & 0xFF) << 24) |
            ((int & 0xFF00) << 8) |
            ((int >> 8) & 0xFF00) |
            ((int >> 24) & 0xFF));
    }
    /**
     * @protected
     */
    endianSwap(int) {
        return (((int & 0xFF) << 24) |
            ((int & 0xFF00) << 8) |
            ((int >> 8) & 0xFF00) |
            ((int >> 24) & 0xFF));
    }

    /**
     * @param {ArrayBuffer|TypedArray|Buffer} buffer Buffer that contains data to be read
     */
    constructor(buffer) {
        this.buffer = new Uint8Array(buffer.buffer || buffer);
        this._at = 0;
        this.lastAt = 0;
        this.size = this.buffer.byteLength;
    }
    get at() {
        return this._at;
    }
    set at(v) {
        this.lastAt = v ? this.at : 0;
        this._at = v;
    }

    u8() {
        return this.buffer[this.at++];
    }

    i8() {
        Reader.u8[0] = this.buffer[this.at++];
        return Reader.i8[0]
    }

    u16() {
        Reader.u8.set(this.buffer.subarray(this.at, this.at += 2));
        return Reader.u16[0];
    }

    i16() {
        Reader.u8.set(this.buffer.subarray(this.at, this.at += 2));
        return Reader.i16[0];
    }

    u32() {
        Reader.u8.set(this.buffer.subarray(this.at, this.at += 4));
        return Reader.u32[0];
    }

    i32() {
        Reader.u8.set(this.buffer.subarray(this.at, this.at += 4));
        return Reader.i32[0];
    }

    f32() {
        Reader.u8.set(this.buffer.subarray(this.at, this.at += 4));
        return Reader.f32[0];
    }

    u64() {
        Reader.u8.set(this.buffer.subarray(this.at, this.at += 8));
        return Reader.u64[0];
    }

    i64() {
        Reader.u8.set(this.buffer.subarray(this.at, this.at += 8));
        return Reader.i64[0];
    }

    f64() {
        Reader.u8.set(this.buffer.subarray(this.at, this.at += 8));
        return Reader.f64[0];
    }


    vu1() {
        return this.u8() & 0x01
    }
    vu7() {
        return this.u8() & 0x7F;
    }
    vs7() { // kinda cheating:
        let out = this.vu7();
        out -= (out & 0x40) << 1;
        return out;
    }
    // VarUint32
    // LEB128 Unsigned
    vu32() {
        let i = 0;
        let out = 0;
        while (this.buffer[this.at] & 0x80) {
            out |= (this.buffer[this.at++] & 0x7F) << i;
            i += 7;
        }
        out |= (this.buffer[this.at++] & 0x7F) << i;

        return out;
    }

    // VarSint32
    // LEB128 Signed
    vs32() {
        return this.vu32() ^ 0;
    }

    byteArray(len = this.vu32()) {
        return this.buffer.slice(this.at, this.at += len);
    }

    array(readFunc, length = this.vu32()) {
        let out = Array(length);

        for (let i = 0; i < length; ++i) out[i] = readFunc.call(this, i);

        return out;
    }

    string(length = this.vu32()) {
        return Reader.UTF8.decode(this.buffer.subarray(this.at, this.at += length));
    }
}

module.exports = Reader;