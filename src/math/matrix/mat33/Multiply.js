let mat = Float32Array;

export function mat33 (a, b, dst = new mat(9)) {

    const a0  = a[0];
    const a1  = a[1];
    const a2  = a[2];
    const a3  = a[3];
    const a4  = a[4];
    const a5  = a[5];
    const a6  = a[6];
    const a7  = a[7];
    const a8  = a[8];

    const b0  = b[0];
    const b1  = b[1];
    const b2  = b[2];
    const b3  = b[3];
    const b4  = b[4];
    const b5  = b[5];
    const b6  = b[6];
    const b7  = b[7];
    const b8  = b[8];

    dst[0] = b0 * a0 + b3 * a1 + b6 * a2;
    dst[1] = b1 * a0 + b4 * a1 + b7 * a2;
    dst[2] = b2 * a0 + b5 * a1 + b8 * a2;

    dst[3] = b0 * a3 + b3 * a4 + b6 * a5;
    dst[4] = b1 * a3 + b4 * a4 + b7 * a5;
    dst[5] = b2 * a3 + b5 * a4 + b8 * a5;

    dst[6] = b0 * a6 + b3 * a7 + b6 * a8;
    dst[7] = b1 * a6 + b4 * a7 + b7 * a8;
    dst[8] = b2 * a6 + b5 * a7 + b8 * a8;

    return dst;

}

export function mat43 (a, b, dst = new mat(12)) {

    const a0 = a[0];
    const a1 = a[1];
    const a2 = a[2];
    const a3 = a[3];
    const a4 = a[4];
    const a5 = a[5];
    const a6 = a[6];
    const a7 = a[7];
    const a8 = a[8];

    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    const b3 = b[3];
    const b4 = b[4];
    const b5 = b[5];
    const b6 = b[6];
    const b7 = b[7];
    const b8 = b[8];

    dst[0] = b0 * a0 + b3 * a1 + b6 * a2;
    dst[1] = b1 * a0 + b4 * a1 + b7 * a2;
    dst[2] = b2 * a0 + b5 * a1 + b8 * a2;

    dst[3] = b0 * a3 + b3 * a4 + b6 * a5;
    dst[4] = b1 * a3 + b4 * a4 + b7 * a5;
    dst[5] = b2 * a3 + b5 * a4 + b8 * a5;

    dst[6] = b0 * a6 + b3 * a7 + b6 * a8;
    dst[7] = b1 * a6 + b4 * a7 + b7 * a8;
    dst[8] = b2 * a6 + b5 * a7 + b8 * a8;

    dst[9] = b[9];
    dst[10] = b[10];
    dst[11] = b[11];

    return dst;

}

export function mat44 (a, b, dst = new mat(16)) {

    const a0  = a[0];
    const a1  = a[1];
    const a2  = a[2];
    const a3  = a[3];
    const a4  = a[4];
    const a5  = a[5];
    const a6  = a[6];
    const a7  = a[7];
    const a8  = a[8];

    const b0  = b[0];
    const b1  = b[1];
    const b2  = b[2];
    const b3  = b[3];
    const b4  = b[4];
    const b5  = b[5];
    const b6  = b[6];
    const b7  = b[7];
    const b8  = b[8];
    const b9  = b[9];
    const b10 = b[10];
    const b11 = b[11];

    dst[0] = b0 * a0 + b4 * a1 + b8  * a2;
    dst[1] = b1 * a0 + b5 * a1 + b9  * a2;
    dst[2] = b2 * a0 + b6 * a1 + b10 * a2;
    dst[3] = b3 * a0 + b7 * a1 + b11 * a2;

    dst[4] = b0 * a3 + b4 * a4 + b8  * a5;
    dst[5] = b1 * a3 + b5 * a4 + b9  * a5;
    dst[6] = b2 * a3 + b6 * a4 + b10 * a5;
    dst[7] = b3 * a3 + b7 * a4 + b11 * a5;

    dst[8] = b0 * a6 + b4 * a7 + b8  * a8;
    dst[9] = b1 * a6 + b5 * a7 + b9  * a8;
    dst[10] = b2 * a6 + b6 * a7 + b10 * a8;
    dst[11] = b3 * a6 + b7 * a7 + b11 * a8;

    dst[12] = b[12];
    dst[13] = b[13];
    dst[14] = b[14];
    dst[15] = b[15];

    return dst;

}
