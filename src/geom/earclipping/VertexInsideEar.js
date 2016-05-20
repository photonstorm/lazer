import Sub from 'math/vector/vec2/Sub.js'
import Dot from 'math/vector/vec2/Dot.js'

export default function VertexInsideEar(vertex, ear) {
    let p0, p1, p2, v, u,
        verts = ear.vertices,
        v0 = verts[0],
        v1 = verts[1],
        v2 = verts[2];

    if ((v0[0] === vertex[0] && v0[1] === vertex[1]) ||
        (v1[0] === vertex[0] && v1[1] === vertex[1]) ||
        (v2[0] === vertex[0] && v2[1] === vertex[1])) {
        return false;
    }
    p0 = Sub(v0, v1);
    p1 = Sub(v2, v1);
    p2 = Sub(vertex, v1);
    u = (Dot(p1, p1) * Dot(p2, p0) - Dot(p1, p0) * Dot(p2, p1)) / (Dot(p0, p0) * Dot(p1, p1) - Dot(p0, p1) * Dot(p1, p0));
    v = (Dot(p0, p0) * Dot(p2, p1) - Dot(p0, p1) * Dot(p2, p1)) / (Dot(p0, p0) * Dot(p1, p1) - Dot(p0, p1) * Dot(p1, p0));
    return !(u < 0 || v < 0 || u > 1 || v > 1 || (u + v) > 1);

}