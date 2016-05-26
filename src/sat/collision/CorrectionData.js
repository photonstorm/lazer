let vec2 = Float32Array;
const MAX_NUM = Number.MAX_VALUE;

export default class CorrectionData {
    constructor() {
        this.unit = new vec2(2);
        this.overlap = MAX_NUM;
        this.correction = new vec2(2);
    }
    clear() {
        this.unit[0] = 0;
        this.unit[1] = 0;
        this.overlap = MAX_NUM;
        this.correction[0] = 0;
        this.correction[1] = 0;
    }
}