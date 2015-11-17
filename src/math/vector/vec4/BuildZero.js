let vec4 = Float32Array;

export default function (dst = new vec4(4)) {

    dst[0] = 0;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;

    return dst;

}
