import { RegisterBody } from 'physics/arcade/PhysicsSystem.js';

class RandomAccessVec2 {
    constructor(x = 0, y = 0) {
        this.px = null;
        this.py = null;
        this._a = x;
        this._b = y;
    }
    init(ptrX, ptrY) {
        this.px = ptrX;
        this.py = ptrY;
        this.px[0] = this._a;
        this.py[0] = this._b;
    }
    get x() {
        return this.px[0];
    }
    get y() {
        return this.py[0];
    }
    set x(value) {
        this.px[0] = value;
    }
    set y(value) {
        this.py[0] = value;
    }
}

export default function Body(x, y, width, height) {
    return RegisterBody({
        position: new RandomAccessVec2(x, y),
        velocity: new RandomAccessVec2(),
        acceleration: new RandomAccessVec2(),
        gravity: new RandomAccessVec2(),
        bounce: new RandomAccessVec2(),
        maxVelocity: new RandomAccessVec2(10000, 10000),
        friction: new RandomAccessVec2(1, 0),
        ID: -1
    });
}