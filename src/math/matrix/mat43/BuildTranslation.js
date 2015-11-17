let mat = Float32Array;

export default function (x, y = null, z = null, dst = new mat(12)) {

    if (z !== null)
    {
        dst[9] = x;
        dst[10] = y;
        dst[11] = z;
    }
    else
    {
        dst[9] = x[0];
        dst[10] = x[1];
        dst[11] = x[2];
    }

    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 1;
    dst[5] = 0;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 1;

    return dst;

}
