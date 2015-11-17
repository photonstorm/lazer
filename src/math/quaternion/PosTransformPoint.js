import Add from 'math/vector/vec3/Add.js';
import TransformVector from 'math/quaternion/TransformVector.js';

export default function (qp, p) {

    const offset = qp.slice(4, 7);

    const rotatedp = TransformVector(qp, p);

    return Add(rotatedp, offset);

}
