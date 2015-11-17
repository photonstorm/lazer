let mat = Float32Array;

export default function (m, scale, dst = new mat(12)) {

    const sx = scale[0];
    const sy = scale[1];
    const sz = scale[2];

    dst[0] = m[0] * sx;
    dst[1] = m[1] * sx;
    dst[2] = m[2] * sx;
    dst[3] = m[3];

    dst[4] = m[4] * sy;
    dst[5] = m[5] * sy;
    dst[6] = m[6] * sy;
    dst[7] = m[7];

    dst[8] = m[8] * sz;
    dst[9] = m[9] * sz;
    dst[10] = m[10] * sz;
    dst[11] = m[11];

    return dst;

}
