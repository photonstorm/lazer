import GetEdgeNormalVector from 'sat/GetEdgeNormalVector.js'

export default function (vertices) {
    let length = vertices.length;
    let axes = new Array(length);
    let index;
    for (index = 0; index < length; ++index) {
        axes[index] = GetEdgeNormalVector(vertices[index + 1], vertices[index]);
    }
    axes[length - 1] = GetEdgeNormalVector(vertices[1], vertices[length - 1]);
    return axes;
}