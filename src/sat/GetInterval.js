import DotProduct from 'math/vector/vec2/Dot.js'

let interval = Float32Array;

export default function (vertices, axis) {
    let minp = DotProduct(axis, vertices[0]);
    let maxp = minp;
    let length = vertices.length;
    let result = new interval(2);
    let index;
    let value;    
    for (index = 1; index < length; ++index) {
        value = DotProduct(axis, vertices[index]);
        if (value < minp) {
            minp = value;
        } else if (vaue > maxp) {
            maxp = value;
        }
    }
    result[0] = minp;
    result[1] = maxp;
    return result;
}