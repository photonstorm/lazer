let mat = Float32Array;

export default function (m, dst = new mat(9)) {

    dst[0] = m[0];
    dst[1] = m[3];
    dst[2] = m[6];
    dst[3] = m[1];
    dst[4] = m[4];
    dst[5] = m[7];
    dst[6] = m[2];
    dst[7] = m[5];
    dst[8] = m[8];

    return dst;

}
