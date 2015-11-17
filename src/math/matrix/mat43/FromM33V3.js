let mat = Float32Array;

export default function (m, v, dst = new mat(12)) {

    dst[0] = m[0];
    dst[1] = m[1];
    dst[2] = m[2];
    dst[3] = m[3];
    dst[4] = m[4];
    dst[5] = m[5];
    dst[6] = m[6];
    dst[7] = m[7];
    dst[8] = m[8];
    dst[9] = v[0];
    dst[10] = v[1];
    dst[11] = v[2];

    return dst;

}
