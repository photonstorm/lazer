import Multiply from 'math/quaternion/Multiply.js';
import PosTransformPoint from 'math/quaternion/PosTransformPoint.js';

export default function (qp, p) {

    const v2 = qp2.slice(4, 7);
    const qr = Multiply(qp1, qp2);
    const pr = PosTransformPoint(qp1, v2);

    qr[4] = pr[0];
    qr[5] = pr[1];
    qr[6] = pr[2];

    return qr;

}
