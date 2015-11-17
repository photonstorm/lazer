let vec3 = Float32Array;

export default function (a, b, dst = new vec3(3)) {

    dst[0] = a[0] + b;
    dst[1] = a[1] + b;
    dst[2] = a[2] + b;

    return dst;

}
