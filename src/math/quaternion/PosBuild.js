let quat = Float32Array;

export default function (x, y, z = null, w = null, px = null, py = null, pz = null, dst = new quat(7))
{
    if (w !== null)
    {
        dst[0] = x;
        dst[1] = y;
        dst[2] = z;
        dst[3] = w;
        dst[4] = px;
        dst[5] = py;
        dst[6] = pz;
    }
    else
    {
        dst[0] = x[0];
        dst[1] = x[1];
        dst[2] = x[2];
        dst[3] = x[3];
        dst[4] = y[0];
        dst[5] = y[1];
        dst[6] = y[2];
    }

    return dst;

}
