let mat = Float32Array;

export default function (m, dst = new mat(16)) {

    dst[0] = m[4];
    dst[1] = m[5];
    dst[2] = m[6];
    dst[3] = m[7];

    return dst;

}
