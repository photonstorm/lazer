let mat = Float32Array;

export default function (m, dst = new mat(9)) {

    dst[0] = m[3];
    dst[1] = m[4];
    dst[2] = m[5];

    return dst;

}
