let mat = Float32Array;

export default function (m, dst = new mat(12)) {

    const m0 = m[0];
    const m1 = m[1];
    const m2 = m[2];
    const m3 = m[3];
    const m4 = m[4];
    const m5 = m[5];
    const m6 = m[6];
    const m7 = m[7];
    const m8 = m[8];

    const px = m[9];
    const py = m[10];
    const pz = m[11];

    dst[0] = m0;
    dst[1] = m3;
    dst[2] = m6;
    dst[3] = m1;
    dst[4] = m4;
    dst[5] = m7;
    dst[6] = m2;
    dst[7] = m5;
    dst[8] = m8;
    dst[9]  = -((px * m0) + (py * m1) + (pz * m2));
    dst[10] = -((px * m3) + (py * m4) + (pz * m5));
    dst[11] = -((px * m6) + (py * m7) + (pz * m8));

    return dst;

}
