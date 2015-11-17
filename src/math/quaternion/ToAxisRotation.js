let quat = Float32Array;

export default function (q, dst = new quat(4)) {

    const q3 = q[3];
    const angle = Math.acos(q3) * 2;
    const sinSqrd = 1 - q3 * q3;

    if (sinSqrd < 1e-6)
    {
        //  We can return any axis
        dst[0] = 1;
        dst[1] = 0;
        dst[2] = 0;
        dst[3] = angle;
    }
    else
    {
        const scale = 1 / Math.sqrt(sinSqrd);

        dst[0] = q[0] * scale;
        dst[1] = q[1] * scale;
        dst[2] = q[2] * scale;
        dst[3] = angle;
    }

    return dst;

}
