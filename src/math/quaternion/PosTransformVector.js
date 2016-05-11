import TransformVector from './TransformVector.js';

let vec3 = Float32Array;

export default function PostTransformVector(qp, n, dst = new vec3(3)) {

    return TransformVector(qp, n, dst);

}
