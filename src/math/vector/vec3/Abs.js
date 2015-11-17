let vec3 = Float32Array;

export default function (a, dst = new vec3(3)) {

    dst[0] = Math.abs(a[0]);
    dst[1] = Math.abs(a[1]);
    dst[2] = Math.abs(a[2]);

    return dst;

}

