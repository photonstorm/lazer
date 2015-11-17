let mat = Float32Array;

export default function (m, v, dst = new mat(16)) {

    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];
    const v3 = v[3];

    if (v3 !== 1)
    {
        dst[0] = (m[0] * v0) + (m[4] * v1) + (m[8]  * v2) + (m[12] * v3);
        dst[1] = (m[1] * v0) + (m[5] * v1) + (m[9]  * v2) + (m[13] * v3);
        dst[2] = (m[2] * v0) + (m[6] * v1) + (m[10] * v2) + (m[14] * v3);
        dst[3] = (m[3] * v0) + (m[7] * v1) + (m[11] * v2) + (m[15] * v3);
    }
    else
    {
        dst[0] = (m[0] * v0) + (m[4] * v1) + (m[8]  * v2) + m[12];
        dst[1] = (m[1] * v0) + (m[5] * v1) + (m[9]  * v2) + m[13];
        dst[2] = (m[2] * v0) + (m[6] * v1) + (m[10] * v2) + m[14];
        dst[3] = (m[3] * v0) + (m[7] * v1) + (m[11] * v2) + m[15];
    }

    return dst;

}
