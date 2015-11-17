
//  Use a lerp for angles <= 4.5 degrees
const cosMinSlerpAngle = Math.cos(Math.PI / 40.0);

let quat = Float32Array;

export default function (q1, q2, t, dst = new quat(4)) {

    let q1x = q1[0];
    let q1y = q1[1];
    let q1z = q1[2];
    let q1w = q1[3];
    let q2x = q2[0];
    let q2y = q2[1];
    let q2z = q2[2];
    let q2w = q2[3];
    const dotq1q2 = (q1x * q2x) + (q1y * q2y) + (q1z * q2z) + (q1w * q2w);

    let cosom = dotq1q2;

    if (cosom < 0)
    {
        q1x = -q1x;
        q1y = -q1y;
        q1z = -q1z;
        q1w = -q1w;

        cosom = -cosom;
    }

    if (cosom > this.cosMinSlerpAngle)
    {
        if (cosom > (1 - 1e-6))
        {
            dst[0] =  q1x;
            dst[1] =  q1y;
            dst[2] =  q1z;
            dst[3] =  q1w;

            return dst;
        }

        let delta = t;

        if (dotq1q2 <= 0)
        {
            delta = -t;
        }

        const qrx = ((q2x - q1x) * delta) + q1x;
        const qry = ((q2y - q1y) * delta) + q1y;
        const qrz = ((q2z - q1z) * delta) + q1z;
        const qrw = ((q2w - q1w) * delta) + q1w;

        const mag = Math.sqrt((qrx * qrx) + (qry * qry) + (qrz * qrz) + (qrw * qrw));
        const recip = 1 / mag;

        dst[0] = qrx * recip;
        dst[1] = qry * recip;
        dst[2] = qrz * recip;
        dst[3] = qrw * recip;

        return dst;
    }

    const omega = Math.acos(cosom);
    const invSinOmega = 1 / Math.sin(omega);

    let scalar = Math.sin((1 - t) * omega) * invSinOmega;

    q1x = q1x * scalar;
    q1y = q1y * scalar;
    q1z = q1z * scalar;
    q1w = q1w * scalar;

    scalar = Math.sin(t * omega) * invSinOmega;

    q2x = q2x * scalar;
    q2y = q2y * scalar;
    q2z = q2z * scalar;
    q2w = q2w * scalar;

    dst[0] = q1x + q2x;
    dst[1] = q1y + q2y;
    dst[2] = q1z + q2z;
    dst[3] = q1w + q2w;

    return dst;

}
