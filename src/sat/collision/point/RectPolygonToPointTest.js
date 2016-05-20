import GetProjectionRange from 'sat/GetProjectionRange.js'
import ProjectionsSeparated from 'sat/ProjectionsSeparated.js'
import Sub from 'math/vector/vec2/Sub.js'

// Rectangle data should be expressed like:
// rectangleVertices: [[x, y], [x, y], [x, y], [x, y]]
// A Rectange has 4 right angles. If your shape doesn't
// follow this property then you should use Polygon collision
// detection.
export default function (point, rectangleVertices) {
    let axis = getEdgePerp(point, point);
    let axesB = [getEdgePerp(rectangleVertices[0], rectangleVertices[1]), getEdgePerp(rectangleVertices[1], rectangleVertices[2])];
    let projectionA;
    let projectionB;
    let index;

    // Check First Axes    
    projectionA = GetProjectionRange([point], axis);
    projectionB = GetProjectionRange(rectangleVertices, axis);
    if (ProjectionsSeparated(projectionA, projectionB)) {
        return false;
    }
    
    // Check Second Axes
    for (index = 0; index < 2; ++index) {
        axis = axesB[index];
        projectionA = GetProjectionRange([point], axis);
        projectionB = GetProjectionRange(rectangleVertices, axis);
        if (ProjectionsSeparated(projectionA, projectionB)) {
            return false;
        }
    }
    return true;
}

// Get Single Edge Perp Vector.
function getEdgePerp(vectorA, vectorB) {
    let edge = Sub(vectorA, vectorB);
    let oldX = edge[0];
    edge[0] = edge[1];
    edge[1] = -oldX;
    return edge;
}