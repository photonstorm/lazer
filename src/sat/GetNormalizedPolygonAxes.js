import Sub from 'math/vector/vec2/Sub.js'

let Sqrt = Math.sqrt;

export default function (vertices) {
    const length = vertices.length;
    let normals = new Array(length);
    let index, vecA, vecB, edge, oldX, vlen;
    for (index = 0; index < length; ++index) {
        vecA = vertices[index];
        vecB = index < length - 1 ? vertices[index + 1] : vertices[0];
        edge = Sub(vecB, vecA);
        oldX = edge[0];
        edge[0] = edge[1];
        edge[1] = -oldX;
        vlen = Sqrt(edge[0] * edge[0] + edge[1] * edge[1]);
        if (vlen > 0) {
            edge[0] /= vlen;
            edge[1] /= vlen;
        }
        normals[index] = edge;
    }
    return normals;
}