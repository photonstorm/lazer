let mat = Float32Array;

export default function (a0, a1, a2, a3, a4 = null, a5 = null, a6 = null, a7 = null, a8 = null, a9 = null, a10 = null, a11 = null, a12 = null, a13 = null, a14 = null, a15 = null, dst = new mat(16)) {

    if (a5 !== null)
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
        dst[9] = a9;
        dst[10] = a10;
        dst[11] = a11;
        dst[12] = a12;
        dst[13] = a13;
        dst[14] = a14;
        dst[15] = a15;
    }
    else
    {
        //  a0/1/2/3/4 = arrays
        dst[0] =  a0[0];
        dst[1] =  a0[1];
        dst[2] =  a0[2];
        dst[3] =  a0[3];
        dst[4] =  a1[0];
        dst[5] =  a1[1];
        dst[6] =  a1[2];
        dst[7] =  a1[3];
        dst[8] =  a2[0];
        dst[9] =  a2[1];
        dst[10] = a2[2];
        dst[11] = a2[3];
        dst[12] = a3[0];
        dst[13] = a3[1];
        dst[14] = a3[2];
        dst[15] = a3[3];
    }

    return dst;

}
