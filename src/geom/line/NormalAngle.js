import Angle from 'geom/line/Angle.js';
import Wrap from 'math/Wrap.js';

export default function NormalAngle (line) {

    return Wrap(Angle(line) - 1.5707963267948966, -Math.PI, Math.PI);

}
