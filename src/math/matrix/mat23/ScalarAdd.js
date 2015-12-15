let mat = Float32Array;

//  Add b to each element in matrix a, store results in dst

export default function ScalarAdd (a, b, dst = new mat(6)) {

    dst[0] = a[0] + b;
    dst[1] = a[1] + b;
    dst[2] = a[2] + b;
    dst[3] = a[3] + b;
    dst[4] = a[4] + b;
    dst[5] = a[5] + b;

    return dst;

}
