let mat = Float32Array;

//  Subtracts matrix b from a, puts result into dst

export default function Subtract (a, b, dst = new mat(6)) {

    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];
    dst[3] = a[3] - b[3];
    dst[4] = a[4] - b[4];
    dst[5] = a[5] - b[5];

    return dst;

}
