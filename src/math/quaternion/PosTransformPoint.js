import Add from '../vector/vec3/Add.js';
import TransformVector from './TransformVector.js';

export default function PosTransformPoint(qp, p) {

    const offset = qp.slice(4, 7);

    const rotatedp = TransformVector(qp, p);

    return Add(rotatedp, offset);

}
