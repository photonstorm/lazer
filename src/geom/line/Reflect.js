import Angle from 'geom/line/Angle.js';
import NormalAngle from 'geom/line/NormalAngle.js';

/**
* Returns the reflected angle between two lines.
* This is the outgoing angle based on the angle of Line 1 and the normalAngle of Line 2.
*
* @method Phaser.Line.reflect
* @param {Phaser.Line} a - The base line.
* @param {Phaser.Line} b - The line to be reflected from the base line.
* @return {number} The reflected angle in radians.
*/
export default function Reflect (a, b) {

    return 2 * NormalAngle(b) - 3.141592653589793 - Angle(a);

}
