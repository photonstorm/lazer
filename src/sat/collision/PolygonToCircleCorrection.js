import GetProjectionRange from 'sat/GetProjectionRange.js'
import GetNormalizedPolygonAxes from 'sat/GetNormalizedPolygonAxes.js'
import ProjectionsSeparated from 'sat/ProjectionsSeparated.js'
import Sub from 'math/vector/vec2/Sub.js'
import DotProduct from 'math/vector/vec2/Dot.js'
import Normalize from 'math/vector/vec2/Normalize.js'
import ScalarMultiply from 'math/vector/vec2/ScalarMultiply.js'

const MAX_NUM = Number.MAX_VALUE;
let range = Float32Array;
let Abs = Math.abs;

export default function (vertices, circlePosition, circleRadius, correctionData) {
    let axes = GetNormalizedPolygonAxes(vertices);
    let closestDistance = MAX_NUM;
    let unitVector = correctionData.unit;
    let correctionOverlap = MAX_NUM;
    let projectionA = new range(2);
    let absoluteDistance;
    let projectionDistanceA;
    let projectionDistanceB;
    let projectionB;
    let closestVertex;
    let distance;
    let index;
    let length;
    let vertex;
    let dx;
    let dy;
    let axis;
    // Look into implementing Voroni Region 
    // detection for better performance.
    for (index = 0, length = vertices.length; index < length; ++index) {
        vertex = vertices[index];
        dx = vertex[0] - circlePosition[0];
        dy = vertex[1] - circlePosition[1];
        distance = Abs(dx * dx + dy * dy);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestVertex = vertex;
        }
    }
    axis = Sub(closestVertex, circlePosition);
    axis = Normalize(axis);
    axes.push(axis);
    for (index = 0, length = axes.length; index < length; ++index) {
        axis = axes[index];
        projectionA[0] = DotProduct(circlePosition, axis);
        projectionA[1] = projectionA[0] + circleRadius;
        projectionA[0] = projectionA[0] - circleRadius;
        projectionB = GetProjectionRange(vertices, axis);
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