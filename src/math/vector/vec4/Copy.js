let vec4 = Float32Array;

export default function (src, dst = new vec4(4)) {

    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
    dst[3] = src[3];

    return dst;

}
