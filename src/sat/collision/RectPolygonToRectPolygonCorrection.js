import GetProjectionRange from 'sat/GetProjectionRange.js'
import ProjectionsSeparated from 'sat/ProjectionsSeparated.js'
import Sub from 'math/vector/vec2/Sub.js'
import Normalize from 'math/vector/vec2/Normalize.js'
import ScalarMultiply from 'math/vector/vec2/ScalarMultiply.js'

const MAX_NUM = Number.MAX_VALUE;
const Abs = Math.abs;

// Rectangle data should be expressed like:
// rectanglePosition: [x, y] 
// rectangleVertices: [[x, y], [x, y], [x, y], [x, y]]
// A Rectange has 4 right angles. If your shape doesn't
// follow this property then you should use Polygon collision
// detection.
export default function (rectangleVerticesA, rectangleVerticesB, correctionData) {
    let axesA = [getEdgeNorm(rectangleVerticesA[0], rectangleVerticesA[1]), getEdgeNorm(rectangleVerticesA[1], rectangleVerticesA[2])];
    let axesB = [getEdgeNorm(rectangleVerticesB[0], rectangleVerticesB[1]), getEdgeNorm(rectangleVerticesB[1], rectangleVerticesB[2])];
    let unitVector = correctionData.unit;
    let correctionOverlap = MAX_NUM;
    let distance;
    let absoluteDistance;
    let projectionDistanceA;
    let projectionDistanceB;
    let projectionA;
    let projectionB;
    let index;
    let length;
    let axis;

    for (index = 0, length = axesA.length; index < length; ++index) {
        axis = axesA[index];
        projectionA = GetProjectionRange(rectangleVerticesA, axis);
        projectionB = GetProjectionRange(rectangleVerticesB, axis);
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
    for (index = 0, length = axesB.length; index < length; ++index) {
        axis = axesB[index];
        projectionA = GetProjectionRange(rectangleVerticesA, axis);
        projectionB = GetProjectionRange(rectangleVerticesB, axis);
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

// Get Single Edge Normal Vector.
function getEdgeNorm(vectorA, vectorB) {
    let edge = Sub(vectorA, vectorB);
    let oldX = edge[0];
    edge[0] = edge[1];
    edge[1] = -oldX;
    return Normalize(edge);
}