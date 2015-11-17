let vec3 = Float32Array;

export default function (src, dst = new vec3(3)) {

    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];

    return dst;

}
