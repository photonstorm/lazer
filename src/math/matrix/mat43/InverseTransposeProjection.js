let mat = Float32Array;

export default function (m, s, dst = new mat(12)) {

    const xf = (0.5 / s[0]);
    const yf = (0.5 / s[1]);
    const zf = (0.5 / s[2]);

    const m0 = (m[0] * xf);
    const m1 = (m[1] * xf);
    const m2 = (m[2] * xf);

    const m3 = (m[3] * yf);
    const m4 = (m[4] * yf);
    const m5 = (m[5] * yf);

    const m6 = (m[6] * zf);
    const m7 = (m[7] * zf);
    const m8 = (m[8] * zf);

    const px = m[9];
    const py = m[10];
    const pz = m[11];

    dst[0] =  m0;
    dst[1] =  m1;
    dst[2] =  m2;
    dst[3] =  0.5 - ((px * m0) + (py * m1) + (pz * m2));
    dst[4] =  m3;
    dst[5] =  m4;
    dst[6] =  m5;
    dst[7] =  0.5 - ((px * m3) + (py * m4) + (pz * m5));
    dst[8] =  m6;
    dst[9]  = m7;
    dst[10] = m8;
    dst[11] = 0.5 - ((px * m6) + (py * m7) + (pz * m8));

    return dst;

}
