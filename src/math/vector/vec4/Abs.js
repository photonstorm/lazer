let vec4 = Float32Array;

export default function (a, dst = new vec4(4)) {

    dst[0] = Math.abs(a[0]);
    dst[1] = Math.abs(a[1]);
    dst[2] = Math.abs(a[2]);
    dst[3] = Math.abs(a[3]);

    return dst;
}
