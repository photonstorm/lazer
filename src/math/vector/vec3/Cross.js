let vec3 = Float32Array;

export default function (a, b, dst = new vec3(3)) {

    const a0 = a[0];
    const a1 = a[1];
    const a2 = a[2];

    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];

    dst[0] = (a1 * b2) - (a2 * b1);
    dst[1] = (a2 * b0) - (a0 * b2);
    dst[2] = (a0 * b1) - (a1 * b0);

    return dst;

}
