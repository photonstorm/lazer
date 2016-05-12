import DotProduct from 'math/vector/vec2/Dot.js'

let range = Float32Array;
const MAX_NUM = Number.MAX_VALUE;

export default function (vertices, axis) {
    let result = new range(2);
    let minp = MAX_NUM;
    let maxp = -MAX_NUM;
    let length = vertices.length;
    let index;
    let dotValue;
    for (index = 0; index < length; ++index) {
        dotValue = DotProduct(vertices[index], axis);
        if (dotValue < minp) minp = dotValue;
        if (dotValue > maxp) maxp = dotValue;
    }
    result[0] = minp;
    result[1] = maxp;
    return result;
}