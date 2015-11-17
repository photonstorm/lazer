let mat = Float32Array;

export default function (m, scale, dst = new mat(16)) {

    dst[0] =  m[0] * scale[0];
    dst[1] =  m[1] * scale[0];
    dst[2] =  m[2] * scale[0];
    dst[3] =  m[3];
    dst[4] =  m[4] * scale[1];
    dst[5] =  m[5] * scale[1];
    dst[6] =  m[6] * scale[1];
    dst[7] =  m[7];
    dst[8] =  m[8] * scale[2];
    dst[9] =  m[9] * scale[2];
    dst[10] = m[10] * scale[2];
    dst[11] = m[11];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];

    return dst;

}
