let vec2 = Float32Array;
const MAX_NUM = Number.MAX_VALUE;

export default class CorrectionData {
    constructor() {
        this.unit = new vec2(2);
        this.overlap = MAX_NUM;
        this.correction = new vec2(2);
    }
}