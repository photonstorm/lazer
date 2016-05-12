import Angle from './Angle.js';

/**
* @name Phaser.Line#normalY
* @property {number} normalY - Gets the y component of the left-hand normal of this line.
* @readonly
*/

export default function NormalY (line) {

    return Math.sin(Angle(line) - 1.5707963267948966);

}
