import Angle from 'geom/line/Angle.js';

/**
* @name Phaser.Line#normalX
* @property {number} normalX - Gets the x component of the left-hand normal of this line.
* @readonly
*/

export default function NormalX (line) {

    return Math.cos(Angle(line) - 1.5707963267948966);

}
