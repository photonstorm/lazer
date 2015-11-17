let vec4 = Float32Array;

export default function (m, a, b, dst = new vec4(4)) {

    dst[0] = m[0] ? a[0] : b[0];
    dst[1] = m[1] ? a[1] : b[1];
    dst[2] = m[2] ? a[2] : b[2];
    dst[3] = m[3] ? a[3] : b[3];

    return dst;

}
