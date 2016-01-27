/**
* Returns a Point object where the x and y values correspond to the center (or midpoint) of the Line segment.
* 
* @method Phaser.Line#midPoint
* @param {Phaser.Point} [out] - A Phaser.Point object into which the result will be populated. If not given a new Point object is created.
* @return {Phaser.Point} A Phaser.Point object with the x and y values set to the center of the line segment.
*/

export default function GetMidPoint (line, out = { x: 0, y: 0 }) {

    out.x = (line.x1 + line.x2) / 2;
    out.y = (line.y1 + line.y2) / 2;

    return out;

}
