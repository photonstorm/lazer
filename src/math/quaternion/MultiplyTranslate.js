
export default function (qa, va, qb, vb, qr, vr) {

    const qax = qa[0];
    const qay = qa[1];
    const qaz = qa[2];
    const qaw = qa[3];
    const qbx = qb[0];
    const qby = qb[1];
    const qbz = qb[2];
    const qbw = qb[3];

    // Multiply together the two quaternions
    let cx = (qaz * qby) - (qay * qbz);
    let cy = (qax * qbz) - (qaz * qbx);
    let cz = (qay * qbx) - (qax * qby);

    qr[0] = (qbx * qaw) + (qax * qbw) + cx;
    qr[1] = (qby * qaw) + (qay * qbw) + cy;
    qr[2] = (qbz * qaw) + (qaz * qbw) + cz;
    qr[3] = (qaw * qbw) - (qax * qbx + qay * qby + qaz * qbz);

    // Transform the 2nd vector by the first quaternion and add in the first position
    const vax = va[0];
    const vay = va[1];
    const vaz = va[2];
    const vbx = vb[0];
    const vby = vb[1];
    const vbz = vb[2];

    let s = (qaw * qaw) - (qax * qax + qay * qay + qaz * qaz);

    const rx = vbx * s;
    const ry = vby * s;
    const rz = vbz * s;

    s = qax * vbx + qay * vby + qaz * vbz;

    const twoS = s + s;
    rx += qax * twoS;
    ry += qay * twoS;
    rz += qaz * twoS;

    cx = (qaz * vby) - (qay * vbz);
    cy = (qax * vbz) - (qaz * vbx);
    cz = (qay * vbx) - (qax * vby);

    const twoQw = qaw + qaw;

    rx += cx * twoQw;
    ry += cy * twoQw;
    rz += cz * twoQw;

    vr[0] = rx + vax;
    vr[1] = ry + vay;
    vr[2] = rz + vaz;

}
