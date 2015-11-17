let vec3 = Float32Array;

export default function (a, dst = new vec3(3)) {

    dst[0] = a;
    dst[1] = a;
    dst[2] = a;

    return dst;

}
