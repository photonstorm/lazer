let mat = Float32Array;

export default function (axis, angle, dst = new mat(9)) {

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

    dst[0] = tx * axisX + c;
    dst[1] = tx * axisY - sz;
    dst[2] = tx * axisZ + sy;

    dst[3] = ty * axisX + sz;
    dst[4] = ty * axisY + c;
    dst[5] = ty * axisZ - sx;

    dst[6] = tz * axisX - sy;
    dst[7] = tz * axisY + sx;
    dst[8] = tz * axisZ + c;

    return dst;

}
