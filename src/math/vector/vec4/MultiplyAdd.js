let vec4 = Float32Array;

export default function (a, dst = new vec4(4)) {

    const a0 = a[0];
    const a1 = a[1];
    const a2 = a[2];
    const a3 = a[3];

    const lsq = ((a0 * a0) + (a1 * a1) + (a2 * a2) + (a3 * a3));

    if (lsq > 0.0)
    {
        const lr = 1.0 / Math.sqrt(lsq);

        dst[0] = a0 * lr;
        dst[1] = a1 * lr;
        dst[2] = a2 * lr;
        dst[3] = a3 * lr;
    }
    else
    {
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
        dst[3] = 0;
    }

    return dst;

}
