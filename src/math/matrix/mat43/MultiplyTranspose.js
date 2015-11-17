let mat = Float32Array;

export default function (a, b, dst = new mat(12)) {

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

    dst[0] =  b0 * a0 + b3 * a1 + b6 * a2;
    dst[1] =  b0 * a3 + b3 * a4 + b6 * a5;
    dst[2] =  b0 * a6 + b3 * a7 + b6 * a8;
    dst[3] =  b0 * a9 + b3 * a10 + b6 * a11 + b9;
    dst[4] =  b1 * a0 + b4 * a1 + b7 * a2;
    dst[5] =  b1 * a3 + b4 * a4 + b7 * a5;
    dst[6] =  b1 * a6 + b4 * a7 + b7 * a8;
    dst[7] =  b1 * a9 + b4 * a10 + b7 * a11 + b10;
    dst[8] =  b2 * a0 + b5 * a1 + b8 * a2;
    dst[9]  = b2 * a3 + b5 * a4 + b8 * a5;
    dst[10] = b2 * a6 + b5 * a7 + b8 * a8;
    dst[11] = b2 * a9 + b5 * a10 + b8 * a11 + b11;

    return dst;

}
