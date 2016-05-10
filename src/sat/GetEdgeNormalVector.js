import GetPerpLeft from 'sat/GetPerpLeft.js'
import GetPerpRight from 'sat/GetPerpRight.js'

let vec2 = Float32Array;

export default function (vectorA, vectorB) {
    let sub = new vec2(2);
    sub[0] = vectorB[0] - vectorA[0];
    sub[1] = vectorB[1] - vectorA[1];
    // Do check if we need to check clockwise or
    // counterclockwise.
    return GetPerpLeft(sub);
}