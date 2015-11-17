let mat = Float32Array;

export default function (m, dst = new mat(16)) {

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
    const m12 = m[12];
    const m13 = m[13];
    const m14 = m[14];
    const m15 = m[15];

    const A0 = (( m0 *  m5) - ( m1 *  m4));
    const A1 = (( m0 *  m6) - ( m2 *  m4));
    const A2 = (( m0 *  m7) - ( m3 *  m4));
    const A3 = (( m1 *  m6) - ( m2 *  m5));
    const A4 = (( m1 *  m7) - ( m3 *  m5));
    const A5 = (( m2 *  m7) - ( m3 *  m6));
    const B0 = (( m8 * m13) - ( m9 * m12));
    const B1 = (( m8 * m14) - (m10 * m12));
    const B2 = (( m8 * m15) - (m11 * m12));
    const B3 = (( m9 * m14) - (m10 * m13));
    const B4 = (( m9 * m15) - (m11 * m13));
    const B5 = ((m10 * m15) - (m11 * m14));

    const det = ((A0 * B5) - (A1 * B4) + (A2 * B3) + (A3 * B2) - (A4 * B1) + (A5 * B0));

    if (det === 0)
    {
        dst[ 0] = 0;
        dst[ 1] = 0;
        dst[ 2] = 0;
        dst[ 3] = 0;
        dst[ 4] = 0;
        dst[ 5] = 0;
        dst[ 6] = 0;
        dst[ 7] = 0;
        dst[ 8] = 0;
        dst[ 9] = 0;
        dst[10] = 0;
        dst[11] = 0;
        dst[12] = 0;
        dst[13] = 0;
        dst[14] = 0;
        dst[15] = 0;
    }
    else
    {
        const detrecp = 1 / det;

        dst[ 0] = (+ ( m5 * B5) - ( m6 * B4) + ( m7 * B3)) * detrecp;
        dst[ 4] = (- ( m4 * B5) + ( m6 * B2) - ( m7 * B1)) * detrecp;
        dst[ 8] = (+ ( m4 * B4) - ( m5 * B2) + ( m7 * B0)) * detrecp;
        dst[12] = (- ( m4 * B3) + ( m5 * B1) - ( m6 * B0)) * detrecp;
        dst[ 1] = (- ( m1 * B5) + ( m2 * B4) - ( m3 * B3)) * detrecp;
        dst[ 5] = (+ ( m0 * B5) - ( m2 * B2) + ( m3 * B1)) * detrecp;
        dst[ 9] = (- ( m0 * B4) + ( m1 * B2) - ( m3 * B0)) * detrecp;
        dst[13] = (+ ( m0 * B3) - ( m1 * B1) + ( m2 * B0)) * detrecp;
        dst[ 2] = (+ (m13 * A5) - (m14 * A4) + (m15 * A3)) * detrecp;
        dst[ 6] = (- (m12 * A5) + (m14 * A2) - (m15 * A1)) * detrecp;
        dst[10] = (+ (m12 * A4) - (m13 * A2) + (m15 * A0)) * detrecp;
        dst[14] = (- (m12 * A3) + (m13 * A1) - (m14 * A0)) * detrecp;
        dst[ 3] = (- ( m9 * A5) + (m10 * A4) - (m11 * A3)) * detrecp;
        dst[ 7] = (+ ( m8 * A5) - (m10 * A2) + (m11 * A1)) * detrecp;
        dst[11] = (- ( m8 * A4) + ( m9 * A2) - (m11 * A0)) * detrecp;
        dst[15] = (+ ( m8 * A3) - ( m9 * A1) + (m10 * A0)) * detrecp;
    }
    
    return dst;

}
