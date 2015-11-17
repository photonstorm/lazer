let vec3 = Float32Array;

export default function (dst = new vec3(3)) {

    dst[0] = 0;
    dst[1] = 0;
    dst[2] = 1;

    return dst;

}
