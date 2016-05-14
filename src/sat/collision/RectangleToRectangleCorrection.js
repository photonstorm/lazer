import ScalarMultiply from 'math/vector/vec2/ScalarMultiply.js'
import Sub from 'math/vector/vec2/Sub.js'

let Abs = Math.abs;
let vec2 = Float32Array;

// Expects rectangle data to be laid like this:
// [x, y, width, height]
export default function (rectangleA, rectangleB, correctionData) {
    let halfWidthA = rectangleA[2] / 2;
    let halfWidthB = rectangleB[2] / 2;
    let halfHeightA = rectangleA[3] / 2;
    let halfHeightB = rectangleB[3] / 2;
    let distanceX = (rectangleB[0] + halfWidthB) - (rectangleA[0] + halfWidthA);
    let distanceY = (rectangleB[1] + halfHeightB) - (rectangleA[1] + halfHeightA);
    let unitVector = correctionData.unit;
    let correctionVector = new vec2(2);
    let overlapFactor = 0;
    let overlapX = halfWidthA + halfWidthB - Abs(distanceX);
    let overlapY = halfHeightA + halfHeightB - Abs(distanceY);

    if (overlapX < 0 || overlapY < 0) {
        return false;
    }
    if (overlapX < overlapY) {
        unitVector[0] = distanceX > 0 ? 1 : -1;
        unitVector[1] = 0;
        correctionVector[0] = unitVector[0] * overlapX;
        correctionVector[1] = 0;
        overlapFactor = overlapX;
    } else {
        unitVector[0] = 0;
        unitVector[1] = distanceY > 0 ? 1 : -1;
        correctionVector[0] = 0;
        correctionVector[1] = unitVector[1] * overlapY;
        overlapFactor = overlapY;
    }
    correctionData.correction = correctionVector;
    correctionData.overlap = overlapFactor;
    correctionData.unit = unitVector;
    return true;
}