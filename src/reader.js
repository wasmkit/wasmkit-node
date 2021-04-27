class Reader {
    /** @private */
    static convo = new ArrayBuffer(8);
    /** @private */
    static u8 = new Uint8Array(convo);
    /** @private */
    static i8 = new Int8Array(convo);
    /** @private */
    static u16 = new Uint16Array(convo);
    /** @private */
    static i16 = new Int16Array(convo);
    /** @private */
    static u32 = new Uint32Array(convo);
    /** @private */
    static i32 = new Int32Array(convo);
    /** @private */
    static f32 = new Float32Array(convo);
    /** @private */
    static u64 = new BigUint64Array(convo);
    /** @private */
    static i64 = new BigInt64Array(convo);
    /** @private */
    static f64 = new Float64Array(convo);

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
     * @param {ArrayBuffer|TypedArray|Buffer} buffer Buffer that contains data to be read
     */
    constructor(buffer) {
        this.buffer = new Uint8Array(buffer.buffer || buffer);
        this.at = 0;
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
}

module.exports = Reader;