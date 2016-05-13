import Sub from 'math/vector/vec2/Sub.js'
import Normalize from 'math/vector/vec2/Normalize.js'

export default function (vertices) {
    const length = vertices.length;
    let normals = new Array(length);
    let index, vecA, vecB, edge, oldX, vlen;
    for (index = 0; index < length - 1; ++index) {
        vecA = vertices[index];
        vecB = vertices[index + 1];
        edge = Sub(vecB, vecA);
        oldX = edge[0];
        edge[0] = edge[1];
        edge[1] = -oldX;
        normals[index] = Normalize(edge);
    }
    vecA = vertices[length - 1];
    vecB = vertices[0];
    edge = Sub(vecB, vecA);
    oldX = edge[0];
    edge[0] = edge[1];
    edge[1] = -oldX;
    normals[length - 1] = Normalize(edge);
    return normals;
}