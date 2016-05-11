import BuildZero from '../vector/vec4/BuildZero.js';
import ScalarMultiply from '../vector/vec4/ScalarMultiply.js';
import Dot from './Dot.js';

let quat = Float32Array;

export default function Normalize(q, dst = new quat(4)) {

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
