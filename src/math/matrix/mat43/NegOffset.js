let mat = Float32Array;

export default function (m, ov, dst = new mat(12)) {

    const m0 = m[0];
    const m1 = m[1];
    const m2 = m[2];
    const m3 = m[3];
    const m4 = m[4];
    const m5 = m[5];
    const m6 = m[6];
    const m7 = m[7];
    const m8 = m[8];
    const m9 = m[9];
    const m10 = m[10];
    const m11 = m[11];

    const ov0 = -ov[0];
    const ov1 = -ov[1];
    const ov2 = -ov[2];

    dst[0] =  m0;
    dst[1] =  m1;
    dst[2] =  m2;
    dst[3] =  m3;
    dst[4] =  m4;
    dst[5] =  m5;
    dst[6] =  m6;
    dst[7] =  m7;
    dst[8] =  m8;

    dst[9]  = m0 * ov0 + m3 * ov1 + m6 * ov2 + m9;
    dst[10] = m1 * ov0 + m4 * ov1 + m7 * ov2 + m10;
    dst[11] = m2 * ov0 + m5 * ov1 + m8 * ov2 + m11;

    return dst;

}
