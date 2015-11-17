let mat = Float32Array;

export default function (a0, a1, a2, a3, a4 = null, a5 = null, a6 = null, a7 = null, a8 = null, dst = new mat(9)) {

    if (a4 !== null)
    {
        dst[0] = a0;
        dst[1] = a1;
        dst[2] = a2;
        dst[3] = a3;
        dst[4] = a4;
        dst[5] = a5;
        dst[6] = a6;
        dst[7] = a7;
        dst[8] = a8;
    }
    else
    {
        //  a0/1/2 = arrays
        dst[0] = a0[0];
        dst[1] = a0[1];
        dst[2] = a0[2];
        dst[3] = a1[0];
        dst[4] = a1[1];
        dst[5] = a1[2];
        dst[6] = a2[0];
        dst[7] = a2[1];
        dst[8] = a2[2];
    }

    return dst;

}
