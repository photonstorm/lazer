let mat = Float32Array;

export default function (a, b, dst = new mat(16)) {

    const a0 = a[0];
    const a1 = a[1];
    const a2 = a[2];
    const a3 = a[3];
    const a4 = a[4];
    const a5 = a[5];
    const a6 = a[6];
    const a7 = a[7];
    const a8 = a[8];
    const a9 = a[9];
    const a10 = a[10];
    const a11 = a[11];
    const a12 = a[12];
    const a13 = a[13];
    const a14 = a[14];
    const a15 = a[15];

    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    const b3 = b[3];
    const b4 = b[4];
    const b5 = b[5];
    const b6 = b[6];
    const b7 = b[7];
    const b8 = b[8];
    const b9 = b[9];
    const b10 = b[10];
    const b11 = b[11];
    const b12 = b[12];
    const b13 = b[13];
    const b14 = b[14];
    const b15 = b[15];

    dst[0] = b0 * a0  + b4 * a1  + b8  * a2  + b12 * a3;
    dst[1] = b1 * a0  + b5 * a1  + b9  * a2  + b13 * a3;
    dst[2] = b2 * a0  + b6 * a1  + b10 * a2  + b14 * a3;
    dst[3] = b3 * a0  + b7 * a1  + b11 * a2  + b15 * a3;
    dst[4] = b0 * a4  + b4 * a5  + b8  * a6  + b12 * a7;
    dst[5] = b1 * a4  + b5 * a5  + b9  * a6  + b13 * a7;
    dst[6] = b2 * a4  + b6 * a5  + b10 * a6  + b14 * a7;
    dst[7] = b3 * a4  + b7 * a5  + b11 * a6  + b15 * a7;
    dst[8] = b0 * a8  + b4 * a9  + b8  * a10 + b12 * a11;
    dst[9] = b1 * a8  + b5 * a9  + b9  * a10 + b13 * a11;
    dst[10] = b2 * a8  + b6 * a9  + b10 * a10 + b14 * a11;
    dst[11] = b3 * a8  + b7 * a9  + b11 * a10 + b15 * a11;
    dst[12] = b0 * a12 + b4 * a13 + b8  * a14 + b12 * a15;
    dst[13] = b1 * a12 + b5 * a13 + b9  * a14 + b13 * a15;
    dst[14] = b2 * a12 + b6 * a13 + b10 * a14 + b14 * a15;
    dst[15] = b3 * a12 + b7 * a13 + b11 * a14 + b15 * a15;

    return dst;

}
