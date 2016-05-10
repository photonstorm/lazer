let vec2 = Float32Array;

export default function (vector) {
    let result = new vec2(2);
    result[0] = -vector[1];
    result[1] = vector[0];
    return result;
}