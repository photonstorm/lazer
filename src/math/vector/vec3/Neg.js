let vec3 = Float32Array;

export default function (a, dst = new vec3(3)) {

    dst[0] = -a[0];
    dst[1] = -a[1];
    dst[2] = -a[2];

    return dst;

}
