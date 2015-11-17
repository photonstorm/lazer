let vec3 = Float32Array;

export default function (a, b, c, dst = new vec3(3)) {

    dst[0] = a[0] + b[0] * c;
    dst[1] = a[1] + b[1] * c;
    dst[2] = a[2] + b[2] * c;

    return dst;

}
