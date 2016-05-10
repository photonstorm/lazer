import GetPolygonAxes from 'sat/GetPolygonAxes.js'
import GetInterval from 'sat/GetInterval.js'
import AreIntervalSeparated from 'sat/AreIntervalSeparated.js'

// Expects polygon data to be [[x, y], [x, y], ...]
export default function (verticesA, verticesB) {
    let axesA = GetPolygonAxes(verticesA);
    let axesB = GetPolygonAxes(verticesB);
    let length = axesA.length;
    let index;
    let intervalA;
    let intervalB;
    let axis;
    for (index = 0; index < length; ++index) {
        axis = axesA[index];
        intervalA = GetInterval(verticesA, axis);
        intervalB = GetInterval(verticesB, axis);
        if (AreIntervalSeparated(intervalA, intervalB)) {
            return false;
        }
    }
    for (index = 0, length = axesB.length; index < length; ++index) {
        axis = axesB[index];
        intervalA = GetInterval(verticesA, axis);
        intervalB = GetInterval(verticesB, axis);
        if (AreIntervalSeparated(intervalA, intervalB)) {
            return false;
        }
    }
    return true;
}