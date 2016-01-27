/**
* Tests if the given coordinates fall on this line. See pointOnSegment to test against just the line segment.
* 
* @method Phaser.Line#pointOnLine
* @param {number} x - The line to check against this one.
* @param {number} y - The line to check against this one.
* @return {boolean} True if the point is on the line, false if not.
*/
export default function PointOnLine (line, x, y) {

    return ((x - line.x1) * (line.y2 - line.y1) === (line.x2 - line.x1) * (y - line.y1));

}
