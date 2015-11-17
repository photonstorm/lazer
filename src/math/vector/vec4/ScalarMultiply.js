let vec4 = Float32Array;

export default function (a, b, dst = new vec4(4)) {

    if (b === 0)
    {
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
        dst[3] = 0;
    }
    else
    {
        dst[0] = a[0] * b;
        dst[1] = a[1] * b;
        dst[2] = a[2] * b;
        dst[3] = a[3] * b;
    }

    return dst;

}
