let vec4 = Float32Array;

export default function (dst = new vec4(4)) {

    dst[0] = 1;
    dst[1] = 1;
    dst[2] = 1;
    dst[3] = 1;

    return dst;

}
