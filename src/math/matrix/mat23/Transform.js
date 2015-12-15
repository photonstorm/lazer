
//  Transform the matrix dst by the given values

export default function Transform (dst, a2, b2, c2, d2, e2, f2) {

    const a1 = dst[0];
    const b1 = dst[1];
    const c1 = dst[2];
    const d1 = dst[3];
    const e1 = dst[4];
    const f1 = dst[5];

    dst[0] = a1 * a2 + c1 * b2;
    dst[1] = b1 * a2 + d1 * b2;
    dst[2] = a1 * c2 + c1 * d2;
    dst[3] = b1 * c2 + d1 * d2;
    dst[4] = a1 * e2 + c1 * f2 + e1;
    dst[5] = b1 * e2 + d1 * f2 + f1;

    return dst;

}
