let mat = Float32Array;

export default function (m, dst = new mat(12)) {

    dst[0] =  m[0];
    dst[1] =  m[3];
    dst[2] =  m[6];
    dst[3] =  m[9];
    dst[4] =  m[1];
    dst[5] =  m[4];
    dst[6] =  m[7];
    dst[7] =  m[10];
    dst[8] =  m[2];
    dst[9]  = m[5];
    dst[10] = m[8];
    dst[11] = m[11];

    return dst;

}
