import Sub from 'math/vector/vec2/Sub.js'

export default function (vertices) {
    const length = vertices.length;
    let axes = new Array(length);
    let index, vecA, vecB, edge, oldX, vlen;
    for (index = 0; index < length - 1; ++index) {
        vecA = vertices[index];
        vecB = vertices[index + 1];
        edge = Sub(vecB, vecA);
        oldX = edge[0];
        edge[0] = edge[1];
        edge[1] = -oldX;
        axes[index] = edge;
    }
    vecA = vertices[length - 1];
    vecB = vertices[0];
    edge = Sub(vecB, vecA);
    oldX = edge[0];
    edge[0] = edge[1];
    edge[1] = -oldX;
    axes[length - 1] = edge;
    return axes;
}