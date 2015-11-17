let mat = Float32Array;

export default function (m, dst = new mat(9)) {

    const m0 = m[0];
    const m1 = m[1];
    const m2 = m[2];
    const m3 = m[3];
    const m4 = m[4];
    const m5 = m[5];
    const m6 = m[6];
    const m7 = m[7];
    const m8 = m[8];

    const d4857 = m4 * m8 - m5 * m7;
    const d5638 = m5 * m6 - m3 * m8;
    const d3746 = m3 * m7 - m4 * m6;
    const det = m0 * d4857 + m1 * d5638 + m2 * d3746;

    if (det === 0)
    {
        dst[0] = dst[1] = dst[2] = 0;
        dst[3] = dst[4] = dst[5] = 0;
        dst[6] = dst[7] = dst[8] = 0;
    }
    else
    {
        const detrecp = 1 / det;

        dst[0] = d4857 * detrecp;
        dst[1] = (m7 * m2 - m8 * m1) * detrecp;
        dst[2] = (m1 * m5 - m2 * m4) * detrecp;
        dst[3] = d5638 * detrecp;
        dst[4] = (m8 * m0 - m6 * m2) * detrecp;
        dst[5] = (m3 * m2 - m0 * m5) * detrecp;
        dst[6] = d3746 * detrecp;
        dst[7] = (m6 * m1 - m7 * m0) * detrecp;
        dst[8] = (m0 * m4 - m3 * m1) * detrecp;
    }

    return dst;

}
