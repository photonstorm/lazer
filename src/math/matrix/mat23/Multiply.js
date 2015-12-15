let mat = Float32Array;

//  Multiplies a by b and puts the result into dst

export default function Multiply (a, b, dst = new mat(6)) {

    const a0  = a[0];
    const a1  = a[1];
    const a2  = a[2];
    const a3  = a[3];
    const a4  = a[4];
    const a5  = a[5];

    const b0  = b[0];
    const b1  = b[1];
    const b2  = b[2];
    const b3  = b[3];
    const b4  = b[4];
    const b5  = b[5];

    dst[0] = a0 * b0 + a2 * b1;
    dst[1] = a1 * b0 + a3 * b1;
    dst[2] = a0 * b2 + a2 * b3;
    dst[3] = a1 * b2 + a3 * b3;
    dst[4] = a0 * b4 + a2 * b5 + a4;
    dst[5] = a1 * b4 + a3 * b5 + a5;

    return dst;

}
