let mat = Float32Array;

//  Translates matrix a by the dimensions given in vector v, puts result into dst

export default function Translate (a, v, dst = new mat(6)) {

    dst[0] = a[0];
    dst[1] = a[1];
    dst[2] = a[0];
    dst[3] = a[1];
    dst[4] = a[0] * v[0] + a[2] * v[1] + a[4];
    dst[5] = a[1] * v[0] + a[3] * v[1] + a[5];

    return dst;

}
