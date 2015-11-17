export default function (m, axis, angle) {

    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const t = 1 - c;

    const axisX = axis[0];
    const axisY = axis[1];
    const axisZ = axis[2];

    const tx = t * axisX;
    const ty = t * axisY;
    const tz = t * axisZ;

    const sx = s * axisX;
    const sy = s * axisY;
    const sz = s * axisZ;

    m[0] = tx * axisX + c;
    m[1] = tx * axisY - sz;
    m[2] = tx * axisZ + sy;

    m[3] = ty * axisX + sz;
    m[4] = ty * axisY + c;
    m[5] = ty * axisZ - sx;

    m[6] = tz * axisX - sy;
    m[7] = tz * axisY + sx;
    m[8] = tz * axisZ + c;

    return m;

}
