let vec4 = Float32Array;

export default function (a, dst = new vec4(4)) {

    dst[0] = a;
    dst[1] = a;
    dst[2] = a;
    dst[3] = a;

    return dst;

}
