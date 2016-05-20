import Sub from 'math/vector/vec2/Sub.js'
import Dot from 'math/vector/vec2/Dot.js'
import Equal from 'math/vector/vec2/Equal.js'

export default function VertexInsideEar(vertex, v0, v1, v2) {
    let p0, p1, p2, v, u;

    if (Equal(v0, vertex) || Equal(v1, vertex) || Equal(v2, vertex)) {
        return false;
    }
    p0 = Sub(v0, v1);
    p1 = Sub(v2, v1);
    p2 = Sub(vertex, v1);
    u = (Dot(p1, p1) * Dot(p2, p0) - Dot(p1, p0) * Dot(p2, p1)) / (Dot(p0, p0) * Dot(p1, p1) - Dot(p0, p1) * Dot(p1, p0));
    v = (Dot(p0, p0) * Dot(p2, p1) - Dot(p0, p1) * Dot(p2, p1)) / (Dot(p0, p0) * Dot(p1, p1) - Dot(p0, p1) * Dot(p1, p0));
    return !(u < 0 || v < 0 || u > 1 || v > 1 || (u + v) > 1);

}