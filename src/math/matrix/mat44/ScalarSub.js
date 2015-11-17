let mat = Float32Array;

export default function (m, s, dst = new mat(16)) {

    dst[0] = m[0] - s;
    dst[1] = m[1] - s;
    dst[2] = m[2] - s;
    dst[3] = m[3] - s;
    dst[4] = m[4] - s;
    dst[5] = m[5] - s;
    dst[6] = m[6] - s;
    dst[7] = m[7] - s;
    dst[8] = m[8] - s;
    dst[9] = m[9] - s;
    dst[10] = m[10] - s;
    dst[11] = m[11] - s;
    dst[12] = m[12] - s;
    dst[13] = m[13] - s;
    dst[14] = m[14] - s;
    dst[15] = m[15] - s;

    return dst;

}
