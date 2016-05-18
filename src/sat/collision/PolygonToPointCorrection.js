import GetNormalizedPolygonAxes from 'sat/GetNormalizedPolygonAxes.js'
import GetProjectionRange from 'sat/GetProjectionRange.js'
import ProjectionsSeparated from 'sat/ProjectionsSeparated.js'
import ScalarMultiply from 'math/vector/vec2/ScalarMultiply.js'

const MAX_NUM = Number.MAX_VALUE;
const Abs = Math.abs;

// Expects polygon data to be [[x, y], [x, y], ...]
export default function (point, verticesB, correctionData) {
    let axesA = GetNormalizedPolygonAxes(verticesA);
    let axesB = GetNormalizedPolygonAxes(verticesB);
    let unitVector = correctionData.unit;
    let correctionOverlap = MAX_NUM;
    let projectionA;
    let projectionB;
    let length;
    let index;
    let distance;
    let absoluteDistance;
    let axis;
    let projectionDistanceA;
    let projectionDistanceB;

    // Check First Axes
    for (index = 0, length = axesA.length; index < length; ++index) {
        axis = axesA[index];
        projectionA = GetProjectionRange(verticesA, axis);
        projectionB = GetProjectionRange(verticesB, axis);
        distance = 0;
        absoluteDistance = 0;

        if (ProjectionsSeparated(projectionA, projectionB))
            return false;

        if (projectionA[0] < projectionB[0] &&
            projectionA[1] < projectionB[1]) {
            distance = projectionA[1] - projectionB[0];
        } else if (projectionA[1] > projectionB[1]) {
            distance = projectionA[0] - projectionB[1];
        } else {
            projectionDistanceA = projectionA[1] - projectionB[0];
            projectionDistanceB = projectionB[1] - projectionA[0];
            if (projectionDistanceA < projectionDistanceB) {
                distance = projectionA;
            } else {
                distance = -projectionB;
            }
        }
        absoluteDistance = Abs(distance);
        if (absoluteDistance < correctionOverlap) {
            correctionOverlap = absoluteDistance;
            unitVector = axis;
            if (distance < 0) {
                unitVector[0] = -unitVector[0];
                unitVector[1] = -unitVector[1];
            }
        }
    }

    // Check Second Axes
    for (index = 0, length = axesB.length; index < length; ++index) {
        axis = axesB[index];
        projectionA = GetProjectionRange(verticesA, axis);
        projectionB = GetProjectionRange(verticesB, axis);
        distance = 0;
        absoluteDistance = 0;

        if (ProjectionsSeparated(projectionA, projectionB))
            return false;

        if (projectionA[0] < projectionB[0] &&
            projectionA[1] < projectionB[1]) {
            distance = projectionA[1] - projectionB[0];
        } else if (projectionA[1] > projectionB[1]) {
            distance = projectionA[0] - projectionB[1];
        } else {
            projectionDistanceA = projectionA[1] - projectionB[0];
            projectionDistanceB = projectionB[1] - projectionA[0];
            if (projectionDistanceA < projectionDistanceB) {
                distance = projectionA;
            } else {
                distance = -projectionB;
            }
        }
        absoluteDistance = Abs(distance);
        if (absoluteDistance < correctionOverlap) {
            correctionOverlap = absoluteDistance;
            unitVector = axis;
            if (distance < 0) {
                unitVector[0] = -unitVector[0];
                unitVector[1] = -unitVector[1];
            }
        }
    }
    ScalarMultiply(unitVector, correctionOverlap, correctionData.correction);
    correctionData.overlap = correctionOverlap;
    correctionData.unit = unitVector;
    return true;
}