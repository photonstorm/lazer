import Normalize from 'math/quaternion/Normalize.js';

let quat = Float32Array;

export default function (axis, angle, dst = new quat(4)) {

    const omega = 0.5 * angle;
    const s = Math.sin(omega);
    const c = Math.cos(omega);

    dst[0] = axis[0] * s;
    dst[1] = axis[1] * s;
    dst[2] = axis[2] * s;
    dst[3] = c;

    return Normalize(dst, dst);

}
