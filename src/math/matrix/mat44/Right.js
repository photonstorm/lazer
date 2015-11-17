let mat = Float32Array;

export default function (m, dst = new mat(16)) {

    dst[0] = m[0];
    dst[1] = m[1];
    dst[2] = m[2];
    dst[3] = m[3];

    return dst;

}
