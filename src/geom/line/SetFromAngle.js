/**
* Sets this line to start at the given `x` and `y` coordinates and for the segment to extend at `angle` for the given `length`.
* 
* @method Phaser.Line#fromAngle
* @param {number} x - The x coordinate of the start of the line.
* @param {number} y - The y coordinate of the start of the line.
* @param {number} angle - The angle of the line in radians.
* @param {number} length - The length of the line in pixels.
* @return {Phaser.Line} This line object
*/

export default function SetFromAngle (line, x, y, angle, length) {

    return line.set(
        x, 
        y, 
        x + (Math.cos(angle) * length), 
        y + (Math.sin(angle) * length)
    );

}