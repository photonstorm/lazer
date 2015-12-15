let mat = Float32Array;

//  Scales matrix a by the dimensions given in vector v, puts result into dst

export default function Scale (a, v, dst = new mat(6)) {

    dst[0] = a[0] * v[0];
    dst[1] = a[1] * v[0];
    dst[2] = a[0] * v[1];
    dst[3] = a[1] * v[1];
    dst[4] = a[4];
    dst[5] = a[5];

    return dst;

}
