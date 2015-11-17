let vec4 = Float32Array;

export default function (a, b, c, dst = new vec4(4)) {

    dst[0] = a[0] + b[0] + c[0];
    dst[1] = a[1] + b[1] + c[1];
    dst[2] = a[2] + b[2] + c[2];
    dst[3] = a[3] + b[3] + c[3];

    return dst;

}
