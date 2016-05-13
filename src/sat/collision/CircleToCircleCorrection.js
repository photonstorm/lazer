import Sub from 'math/vector/vec2/Sub.js'
import Length from 'math/vector/vec2/Length.js'
import Normalize from 'math/vector/vec2/Normalize.js'
import ScalarMultiply from 'math/vector/vec2/ScalarMultiply.js'

export default function (circlePositionA, circleRadiusA, circlePositionB, circleRadiusB, correctionData) {
    let unitVector = Sub(circlePositionA, circlePositionB);
    let distance = Length(unitVector);
    let mixRadius = circleRadiusA + circleRadiusB;
    let overlapFactor = 0;
    if (distance > mixRadius)
        return false;
    overlapFactor = mixRadius - distance;
    unitVector = Normalize(unitVector);
    correctionData.unit = unitVector;
    correctionData.overlap = overlapFactor;
    correctionData.correction = ScalarMultiply(unitVector, overlapFactor);
    return true;
}