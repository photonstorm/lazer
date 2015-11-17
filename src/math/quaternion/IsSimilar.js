import Neg from 'math/vector/vec4/Neg.js';
import LengthSq from 'math/vector/vec4/LengthSq.js';
import Sub from 'math/vector/vec4/Sub.js';

export default function (q1, q2, precision = 1e-6) {

    //  This compares for similar rotations not raw data
    let q1temp = q1;

    if (q1[3] * q2[3] < 0)
    {
        //  Quaternions in opposing hemispheres, negate one.
        q1temp = Neg(q1);
    }

    const magSqrd = LengthSq(Sub(q1temp, q2));
    const epsilonSqrd = precision * precision;

    return magSqrd < epsilonSqrd;

}
