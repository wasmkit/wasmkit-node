// Object.getPrototypeOf(Uint8Array).prototype.read = function () {
//     return new Reader(this);
// }

class Reader {
    // Protected data used for conversions
    static convo = new ArrayBuffer(8);
    static u8 = new Uint8Array(Reader.convo);
    static i8 = new Int8Array(Reader.convo);
    static u16 = new Uint16Array(Reader.convo);
    static i16 = new Int16Array(Reader.convo);
    static u32 = new Uint32Array(Reader.convo);
    static i32 = new Int32Array(Reader.convo);
    static f32 = new Float32Array(Reader.convo);
    static u64 = new BigUint64Array(Reader.convo);
    static i64 = new BigInt64Array(Reader.convo);
    static f64 = new Float64Array(Reader.convo);

    static UTF8 = (() => {
        const Decoder = new TextDecoder();
        const Encoder = new TextEncoder();

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

    static endianSwap(int) {
        return (((int & 0xFF) << 24) |
            ((int & 0xFF00) << 8) |
            ((int >> 8) & 0xFF00) |
            ((int >> 24) & 0xFF));
    }
    endianSwap(int) {
        return (((int & 0xFF) << 24) |
            ((int & 0xFF00) << 8) |
            ((int >> 8) & 0xFF00) |
            ((int >> 24) & 0xFF));
    }

    constructor(buffer) {
        this.buffer = new Uint8Array(buffer.buffer || buffer);
        this.size = this.buffer.byteLength;

        this._at = 0;
        this.lastAt = 0;
    }
    get at() {
        return this._at;
    }
    set at(v) {
        // Store previous position for nice(r) looking error messages
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

    // LEB128s
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

    vu64() {
        let i = 0n;
        let out = 0n;
        while (this.buffer[this.at] & 0x80) {
            out |= BigInt(this.buffer[this.at++] & 0x7F) << i;
            i += 7n;
        }
        out |= BigInt(this.buffer[this.at++] & 0x7F) << i;

        return out;
    }
    vs32() {
        return this.vu32() ^ 0;
    }

    // Arrays are defined as vu(count) *count* elements
    byteArray(length = this.vu32()) {// Elements are bytes
        return this.buffer.slice(this.at, this.at += length);
    }

    array(readFunc, length = this.vu32()) {// Elements are read by readFunc
        const out = Array(length);

        for (let i = 0; i < length; ++i) out[i] = readFunc.call(this, i);

        return out;
    }

    string(length = this.vu32()) {// Elements are characters
        return Reader.UTF8.decode(this.buffer.subarray(this.at, this.at += length));
    }
}

module.exports = Reader;