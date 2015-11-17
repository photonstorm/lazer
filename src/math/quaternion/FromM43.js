import Normalize from 'math/quaternion/Normalize.js';
import Conjugate from 'math/quaternion/Conjugate.js';

let quat = Float32Array;

export default function (m, dst = new quat(4)) {

    const m0 = m[0];
    const m1 = m[1];
    const m2 = m[2];
    const m3 = m[3];
    const m4 = m[4];
    const m5 = m[5];
    const m6 = m[6];
    const m7 = m[7];
    const m8 = m[8];

    let x, y, z, w, s;

    const trace = m0 + m4 + m8 + 1;

    if (trace > 1e-6)
    {
        w = Math.sqrt(trace) / 2;
        x = (m5 - m7) / (4 * w);
        y = (m6 - m2) / (4 * w);
        z = (m1 - m3) / (4 * w);
    }
    else
    {
        if ((m0 > m4) && (m0 > m8))
        {
            s = Math.sqrt(1.0 + m0 - m4 - m8) * 2; // S=4*qx
            w = (m5 - m7) / s;
            x = 0.25 * s;
            y = (m3 + m1) / s;
            z = (m6 + m2) / s;
        }
        else if (m4 > m8)
        {
            s = Math.sqrt(1.0 + m4 - m0 - m8) * 2; // S=4*qy
            w = (m6 - m2) / s;
            x = (m3 + m1) / s;
            y = 0.25 * s;
            z = (m7 + m5) / s;
        }
        else
        {
            s = Math.sqrt(1.0 + m8 - m0 - m4) * 2; // S=4*qz
            w = (m1 - m3) / s;
            x = (m6 + m2) / s;
            y = (m7 + m5) / s;
            z = 0.25 * s;
        }
    }

    const q = Normalize([x, y, z, w], dst);

    return Conjugate(q, dst);

}
