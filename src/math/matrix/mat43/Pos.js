let mat = Float32Array;

export default function Pos(m, dst = new mat(12)) {

    dst[0] = m[9];
    dst[1] = m[10];
    dst[2] = m[11];

    return dst;

}
