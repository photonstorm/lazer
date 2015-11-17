import BuildZero from 'math/vector/vec4/BuildZero.js';
import ScalarMultiply from 'math/vector/vec4/ScalarMultiply.js';
import Dot from 'math/vector/quaternion/Dot.js';

let quat = Float32Array;

export default function (q, dst = new quat(4)) {

    const norme = Dot(q, q);

    if (norme === 0)
    {
        return BuildZero(dst);
    }
    else
    {
        return ScalarMultiply(q, 1 / Math.sqrt(norme), dst);
    }

}
