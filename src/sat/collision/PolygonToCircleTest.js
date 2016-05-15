import GetProjectionRange from 'sat/GetProjectionRange.js'
import GetNormalizedPolygonAxes from 'sat/GetNormalizedPolygonAxes.js'
import ProjectionsSeparated from 'sat/ProjectionsSeparated.js'
import Sub from 'math/vector/vec2/Sub.js'
import DotProduct from 'math/vector/vec2/Dot.js'
import Normalize from 'math/vector/vec2/Normalize.js'

const MAX_NUM = Number.MAX_VALUE;
let range = Float32Array;
let Abs = Math.abs;

export default function (vertices, circlePosition, circleRadius) {
    let axes = GetNormalizedPolygonAxes(vertices);
    let closestDistance = MAX_NUM;
    let projectionA = new range(2);
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
    }
    return true;
}