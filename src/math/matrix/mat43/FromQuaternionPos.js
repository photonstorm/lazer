let mat = Float32Array;

export default function (qp, dst = new mat(12)) {

    const qx = qp[0];
    const qy = qp[1];
    const qz = qp[2];
    const qw = qp[3];
    const px = qp[4];
    const py = qp[5];
    const pz = qp[6];

    const xx = 2 * qx * qx;
    const yy = 2 * qy * qy;
    const zz = 2 * qz * qz;
    const xy = 2 * qx * qy;
    const zw = 2 * qz * qw;
    const xz = 2 * qx * qz;
    const yw = 2 * qy * qw;
    const yz = 2 * qy * qz;
    const xw = 2 * qx * qw;

    dst[0] = 1 - yy - zz;
    dst[1] = xy - zw;
    dst[2] = xz + yw;

    dst[3] = xy + zw;
    dst[4] = 1 - xx - zz;
    dst[5] = yz - xw;

    dst[6] = xz - yw;
    dst[7] = yz + xw;
    dst[8] = 1 - xx - yy;

    dst[9] = px;
    dst[10] = py;
    dst[11] = pz;

    return dst;

}
