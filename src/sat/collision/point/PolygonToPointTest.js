import GetPolygonAxes from 'sat/GetPolygonAxes.js'
import GetProjectionRange from 'sat/GetProjectionRange.js'
import ProjectionsSeparated from 'sat/ProjectionsSeparated.js'
import Sub from 'math/vector/vec2/Sub.js'

// Expects polygon data to be [[x, y], [x, y], ...]
export default function (point, verticesB) {
    let axis = getEdgePerp(point, point);
    let axesB = GetPolygonAxes(verticesB);
    let length = axesB.length;
    let index;
    let projectionA;
    let projectionB;

    // Check First Axes    
    projectionA = GetProjectionRange([point], axis);
    projectionB = GetProjectionRange(verticesB, axis);
    if (ProjectionsSeparated(projectionA, projectionB)) {
        return false;
    }
    
    // Check Second Axes
    for (index = 0; index < length; ++index) {
        axis = axesB[index];
        projectionA = GetProjectionRange([point], axis);
        projectionB = GetProjectionRange(verticesB, axis);
        if (ProjectionsSeparated(projectionA, projectionB)) {
            return false;
        }
    }
    return true;
}

function getEdgePerp(vectorA, vectorB) {
    let edge = Sub(vectorA, vectorB);
    let oldX = edge[0];
    edge[0] = edge[1];
    edge[1] = -oldX;
    return edge;
}