import GetPolygonAxes from 'sat/GetPolygonAxes.js'
import GetProjectionRange from 'sat/GetProjectionRange.js'
import ProjectionsSeparated from 'sat/ProjectionsSeparated.js'

// Expects polygon data to be [[x, y], [x, y], ...]
export default function (verticesA, verticesB) {
    let axesA = GetPolygonAxes(verticesA);
    let axesB = GetPolygonAxes(verticesB);
    let length = axesA.length;
    let index;
    let projectionA;
    let projectionB;
    let axis;

    // Check First Axes
    for (index = 0; index < length; ++index) {
        axis = axesA[index];
        projectionA = GetProjectionRange(verticesA, axis);
        projectionB = GetProjectionRange(verticesB, axis);
        if (ProjectionsSeparated(projectionA, projectionB)) {
            return false;
        }
    }
    
    // Check Second Axes
    for (index = 0, length = axesB.length; index < length; ++index) {
        axis = axesB[index];
        projectionA = GetProjectionRange(verticesA, axis);
        projectionB = GetProjectionRange(verticesB, axis);
        if (ProjectionsSeparated(projectionA, projectionB)) {
            return false;
        }
    }
    return true;
}