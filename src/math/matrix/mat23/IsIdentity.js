let mat = Float32Array;

//  Sets mat to be identity matrix

export default function SetIdentity (dst) {

    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 1;
    dst[4] = 0;
    dst[5] = 0;

    return dst;

}
