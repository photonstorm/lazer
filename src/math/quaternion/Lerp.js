let quat = Float32Array;

export default function (q1, q2, t, dst = new quat(4)) {

    const q1x = q1[0];
    const q1y = q1[1];
    const q1z = q1[2];
    const q1w = q1[3];

    const q2x = q2[0];
    const q2y = q2[1];
    const q2z = q2[2];
    const q2w = q2[3];

    dst[0] = ((q2x - q1x) * t) + q1x;
    dst[1] = ((q2y - q1y) * t) + q1y;
    dst[2] = ((q2z - q1z) * t) + q1z;
    dst[3] = ((q2w - q1w) * t) + q1w;

    return dst;

}
