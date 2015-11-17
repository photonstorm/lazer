let mat = Float32Array;

export default function (m, dst = new mat(12)) {

    dst[0] = m[6];
    dst[1] = m[7];
    dst[2] = m[8];

    return dst;

}
