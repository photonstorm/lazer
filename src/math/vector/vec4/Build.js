let vec4 = Float32Array;

export default function (a, b, c, d, dst = new vec4(4)) {

    dst[0] = a;
    dst[1] = b;
    dst[2] = c;
    dst[3] = d;

    return dst;

}
