import GetProjectionRange from 'sat/GetProjectionRange.js'
import ProjectionsSeparated from 'sat/ProjectionsSeparated.js'
import Sub from 'math/vector/vec2/Sub.js'

// Rectangle data should be expressed like:
// rectanglePosition: [x, y] 
// rectangleVertices: [[x, y], [x, y], [x, y], [x, y]]
// A Rectange has 4 right angles. If your shape doesn't
// follow this property then you should use Polygon collision
// detection.
export default function (rectangleVerticesA, rectangleVerticesB) {
    let axesA = [getEdgePerp(rectangleVerticesA[0], rectangleVerticesA[1]), getEdgePerp(rectangleVerticesA[1], rectangleVerticesA[2])];
    let axesB = [getEdgePerp(rectangleVerticesB[0], rectangleVerticesB[1]), getEdgePerp(rectangleVerticesB[1], rectangleVerticesB[2])];
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
    }
    for (index = 0, length = axesB.length; index < length; ++index) {
        axis = axesB[index];
        projectionA = GetProjectionRange(rectangleVerticesA, axis);
        projectionB = GetProjectionRange(rectangleVerticesB, axis);
        if (ProjectionsSeparated(projectionA, projectionB))
            return false;
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