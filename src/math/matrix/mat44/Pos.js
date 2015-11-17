let mat = Float32Array;

export default function (m, dst = new mat(16)) {

    dst[0] = m[12];
    dst[1] = m[13];
    dst[2] = m[14];
    dst[3] = m[15];

    return dst;

}
