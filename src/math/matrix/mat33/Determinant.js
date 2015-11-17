export default function (m) {

    const m0 = m[0];
    const m1 = m[1];
    const m2 = m[2];
    const m3 = m[3];
    const m4 = m[4];
    const m5 = m[5];
    const m6 = m[6];
    const m7 = m[7];
    const m8 = m[8];

    return (
        m0 * (m4 * m8 - m5 * m7) +
        m1 * (m5 * m6 - m3 * m8) +
        m2 * (m3 * m7 - m4 * m6)
    );

}
