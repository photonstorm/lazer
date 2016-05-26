export default class PtrVec2 {
    constructor(ptrX, ptrY, valueX = 0, valueY = 0) {
        this.ptrX = ptrX;
        this.ptrY = ptrY;
        this.ptrX[0] = valueX;
        this.ptrY[0] = valueY;
    }
    get x() {
        return this.ptrX[0];
    }
    get y() {
        return this.ptrY[0];
    }
    set x(value) {
        this.ptrX[0] = value;
    }
    set y(value) {
        this.ptrY[0] = value;
    }
}
