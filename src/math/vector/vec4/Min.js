let vec4 = Float32Array;

export default function (a, b, dst = new vec4(4)) {

    dst[0] = Math.min(a[0], b[0]);
    dst[1] = Math.min(a[1], b[1]);
    dst[2] = Math.min(a[2], b[2]);
    dst[3] = Math.min(a[3], b[3]);

    return dst;

}
