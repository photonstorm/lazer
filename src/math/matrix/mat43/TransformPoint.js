let mat = Float32Array;

export default function (m, v, dst = new mat(12)) {

    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];

    dst[0] = m[0] * v0 + m[3] * v1 + m[6] * v2 + m[9];
    dst[1] = m[1] * v0 + m[4] * v1 + m[7] * v2 + m[10];
    dst[2] = m[2] * v0 + m[5] * v1 + m[8] * v2 + m[11];

    return dst;

}
