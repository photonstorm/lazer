let vec3 = Float32Array;

export default function (q, v, dst = new vec3(3)) {

    /*
    var qimaginary = q; // Use full quat directly to avoid copy
    var qw = q[3];

    var s = (qw * qw) - VMath.v3Dot(qimaginary, qimaginary);

    var r = VMath.v3ScalarMul(v, s);

    s = VMath.v3Dot(qimaginary, v);
    r = VMath.v3Add(r, VMath.v3ScalarMul(qimaginary, s + s));
    r = VMath.v3Add(r, VMath.v3ScalarMul(VMath.v3Cross(qimaginary, v), qw + qw));
    */

    // Inlined from above
    const qx = q[0];
    const qy = q[1];
    const qz = q[2];
    const qw = q[3];

    const vx = v[0];
    const vy = v[1];
    const vz = v[2];

    //var s = (qw * qw) - VMath.v3Dot(qimaginary, qimaginary);
    let s = (qw * qw) - (qx * qx + qy * qy + qz * qz);

    //var r = VMath.v3ScalarMul(v, s);
    const rx = vx * s;
    const ry = vy * s;
    const rz = vz * s;

    //s = VMath.v3Dot(qimaginary, v);
    s = qx * vx + qy * vy + qz * vz;

    //r = VMath.v3Add(r, VMath.v3ScalarMul(qimaginary, s + s));
    const twoS = s + s;

    rx += qx * twoS;
    ry += qy * twoS;
    rz += qz * twoS;

    //r = VMath.v3Add(r, VMath.v3ScalarMul(VMath.v3Cross(VMath.v3Neg(qimaginary), v), qw + qw));
    const cx = (qz * vy) - (qy * vz);
    const cy = (qx * vz) - (qz * vx);
    const cz = (qy * vx) - (qx * vy);

    const twoQw = qw + qw;

    rx += cx * twoQw;
    ry += cy * twoQw;
    rz += cz * twoQw;

    dst[0] = rx;
    dst[1] = ry;
    dst[2] = rz;

    return dst;

}
