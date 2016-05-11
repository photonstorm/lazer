import Sub from 'math/vector/vec2/Sub.js'

export default function (vertices) {
    const length = vertices.length;
    let axes = new Array(length);
    let index, vecA, vecB, edge, oldX, vlen;
    for (index = 0; index < length; ++index) {
        vecA = vertices[index];
        vecB = index < length - 1 ? vertices[index + 1] : vertices[0];
        edge = Sub(vecB, vecA);
        oldX = edge[0];
        edge[0] = edge[1];
        edge[1] = -oldX;
        axes[index] = edge;
    }
    return axes;
}