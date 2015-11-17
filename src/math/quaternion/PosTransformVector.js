import TransformVector from 'math/quaternion/TransformVector.js';

let vec3 = Float32Array;

export default function (qp, n, dst = new vec3(3)) {

    return TransformVector(qp, n, dst);

}
