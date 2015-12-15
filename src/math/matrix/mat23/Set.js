let mat = Float32Array;

//  dst = mat23 or similar structure

export default function Set (dst, a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {

    dst[0] = a;
    dst[1] = b;
    dst[2] = c;
    dst[3] = d;
    dst[4] = e;
    dst[5] = f;

    return dst;

}
