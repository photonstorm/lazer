let vec3 = Float32Array;

export default function (a, b, dst = new vec3(3)) {

    dst[0] = Math.max(a[0], b[0]);
    dst[1] = Math.max(a[1], b[1]);
    dst[2] = Math.max(a[2], b[2]);

    return dst;

}
