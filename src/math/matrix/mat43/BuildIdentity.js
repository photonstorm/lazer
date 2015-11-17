let mat = Float32Array;

export default function (dst = new mat(12)) {

    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 1;
    dst[5] = 0;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 1;
    dst[9] = 0;
    dst[10] = 0;
    dst[11] = 0;

    return dst;

}
