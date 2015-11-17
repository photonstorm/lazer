let quat = Float32Array;

export default function (q1, q2, dst = new quat(4)) {

    // Note quaternion multiplication is the opposite way around from our matrix multiplication
    //var v1 = q1; // use full quats to avoid copy
    //var v2 = q2;

    /*
    // Calculate the imaginary part
    var quat = VMath.v3Add3(VMath.v3ScalarMul(v2, q1[3]), VMath.v3ScalarMul(v1, q2[3]), VMath.v3Cross(v1, v2));
    // And extend with the real part
    quat[3] = (q1[3] * q2[3]) - VMath.v3Dot(v1, v2);
    */

    // Inlined from above
    const q2x = q1[0];
    const q2y = q1[1];
    const q2z = q1[2];
    const q2w = q1[3];
    const q1x = q2[0];
    const q1y = q2[1];
    const q1z = q2[2];
    const q1w = q2[3];

    const cx = (q1z * q2y) - (q1y * q2z);
    const cy = (q1x * q2z) - (q1z * q2x);
    const cz = (q1y * q2x) - (q1x * q2y);

    dst[0] = (q2x * q1w) + (q1x * q2w) + cx;
    dst[1] = (q2y * q1w) + (q1y * q2w) + cy;
    dst[2] = (q2z * q1w) + (q1z * q2w) + cz;
    dst[3] = (q1w * q2w) - (q1x * q2x + q1y * q2y + q1z * q2z);

    return dst;

}
