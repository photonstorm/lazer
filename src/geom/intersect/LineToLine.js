/**
* Checks for intersection between two lines as defined by the given start and end points.
* If asSegment is true it will check for line segment intersection. If asSegment is false it will check for line intersection.
* Returns the intersection segment of AB and EF as a Point, or null if there is no intersection.
* Adapted from code by Keith Hair
*
* @method Phaser.Line.intersectsPoints
* @param {Phaser.Point} a - The start of the first Line to be checked.
* @param {Phaser.Point} b - The end of the first line to be checked.
* @param {Phaser.Point} e - The start of the second Line to be checked.
* @param {Phaser.Point} f - The end of the second line to be checked.
* @param {boolean} [asSegment=true] - If true it will check for segment intersection, otherwise full line intersection.
* @param {Phaser.Point|object} [result] - A Point object to store the result in, if not given a new one will be created.
* @return {Phaser.Point} The intersection segment of the two lines as a Point, or null if there is no intersection.
*/

export default function LineToLine (lineA, lineB, result = { x: 0, y: 0 }) {

    let a1 = lineA.y2 - lineA.y1;
    let a2 = lineB.y2 - lineB.y1;
    let b1 = lineA.x1 - lineA.x2;
    let b2 = lineB.x1 - lineB.x2;
    let c1 = (lineA.x2 * lineA.y1) - (lineA.x1 * lineA.y2);
    let c2 = (lineB.x2 * lineB.y1) - (lineB.x1 * lineB.y2);
    let denom = (a1 * b2) - (a2 * b1);

    if (denom === 0)
    {
        return null;
    }

    result.x = ((b1 * c2) - (b2 * c1)) / denom;
    result.y = ((a2 * c1) - (a1 * c2)) / denom;

    return result;

}