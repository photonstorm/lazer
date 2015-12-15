let mat = Float32Array;

export default function BuildIdentity (dst = new mat(6)) {

    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 1;
    dst[4] = 0;
    dst[5] = 0;

    return dst;

}
