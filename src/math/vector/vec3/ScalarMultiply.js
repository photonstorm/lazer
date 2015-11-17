let vec3 = Float32Array;

export default function (a, b, dst = new vec3(3)) {

    if (b === 0)
    {
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
    }
    else
    {
        dst[0] = a[0] * b;
        dst[1] = a[1] * b;
        dst[2] = a[2] * b;
    }

    return dst;

}
