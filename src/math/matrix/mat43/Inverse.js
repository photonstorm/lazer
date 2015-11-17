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
    const m9 = m[9];
    const m10 = m[10];
    const m11 = m[11];

    const d4857 = m4 * m8 - m5 * m7;
    const d5638 = m5 * m6 - m3 * m8;
    const d3746 = m3 * m7 - m4 * m6;
    const det = m0 * d4857 + m1 * d5638 + m2 * d3746;

    if (det !== 0)
    {
        const rdet = 1 / det;

        dst[0] = d4857 * rdet;
        dst[1] = (m7 * m2 - m8 * m1) * rdet;
        dst[2] = (m1 * m5 - m2 * m4) * rdet;

        dst[3] = d5638 * rdet;
        dst[4] = (m8 * m0 - m6 * m2) * rdet;
        dst[5] = (m3 * m2 - m0 * m5) * rdet;

        dst[6] = d3746 * rdet;
        dst[7] = (m6 * m1 - m7 * m0) * rdet;
        dst[8] = (m0 * m4 - m3 * m1) * rdet;

        dst[9]  = (m3 * (m10 * m8  - m7 * m11) + m4  * (m6 * m11 - m9 * m8) + m5  * (m9 * m7 - m6 * m10)) * rdet;
        dst[10] = (m6 * (m2  * m10 - m1 * m11) + m7  * (m0 * m11 - m9 * m2) + m8  * (m9 * m1 - m0 * m10)) * rdet;
        dst[11] = (m9 * (m2  * m4  - m1 * m5)  + m10 * (m0 * m5  - m3 * m2) + m11 * (m3 * m1 - m0 * m4))  * rdet;
    }
    
    return dst;

}
