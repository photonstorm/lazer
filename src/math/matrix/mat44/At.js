let mat = Float32Array;

export default function (m, dst = new mat(16)) {

    dst[0] = m[8];
    dst[1] = m[9];
    dst[2] = m[10];
    dst[3] = m[11];

    return dst;

}
