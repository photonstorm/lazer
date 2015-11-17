let vec3 = Float32Array;

export default function (a, b, dst = new vec3(3)) {

    dst[0] = Math.min(a[0], b);
    dst[1] = Math.min(a[1], b);
    dst[2] = Math.min(a[2], b);

    return dst;

}
