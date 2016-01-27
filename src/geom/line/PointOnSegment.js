/**
* Tests if the given coordinates fall on this line and within the segment. See pointOnLine to test against just the line.
* 
* @method Phaser.Line#pointOnSegment
* @param {number} x - The line to check against this one.
* @param {number} y - The line to check against this one.
* @return {boolean} True if the point is on the line and segment, false if not.
*/
export default function PointOnSegment (line, x, y) {

    let xMin = Math.min(line.x1, line.x2);
    let xMax = Math.max(line.x1, line.x2);
    let yMin = Math.min(line.y1, line.y2);
    let yMax = Math.max(line.y1, line.y2);

    return (
        ((x - line.x1) * (line.y2 - line.y1) === (line.x2 - line.x1) * (y - line.y1)) &&
        (x >= xMin && x <= xMax) && 
        (y >= yMin && y <= yMax)
    );

}
