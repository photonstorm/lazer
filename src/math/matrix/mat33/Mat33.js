/**
* A 3x3 matrix mostly used for display transforms within the renderer.
* 
* It is represented like so:
* a, b, 0
* c, d, 0
* e, f, 1
*/

export default class Mat33 {

    constructor (a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {

        //  This may look ugly, but it allows for seamless exchange between
        //  Mat33, Float32Array and Array data types.

        this[0] = a;
        this[1] = b;
        this[2] = 0;
        this[3] = c;
        this[4] = d;
        this[5] = 0;
        this[6] = tx;
        this[7] = ty;
        this[8] = 1;

        //  -1 = canvas, +1 = webgl
        this.rotationDirection = -1;

    }

    get a () {
        return this[0];
    }

    get b () {
        return this[1];
    }

    get c () {
        return this[3];
    }

    get d () {
        return this[4];
    }

    get tx () {
        return this[6];
    }

    get ty () {
        return this[7];
    }

    //  angle is in radians
    transform (x = 0, y = 0, angle = 0, scaleX = 1, scaleY = 1) {

        let c = Math.cos(angle);
        let s = Math.sin(angle) * this.rotationDirection;

        this[0] = c * scaleX;
        this[1] = -s * scaleY;
        this[2] = 0;
        this[3] = s * scaleX;
        this[4] = c * scaleY;
        this[5] = 0;
        this[6] = x;
        this[7] = y;
        this[8] = 1;

        return this;

    }

    //  a = mat33
    multiply (a) {

        let b00 = this[0];
        let b01 = this[1];
        let b10 = this[3];
        let b11 = this[4];
        let b20 = this[5];
        let b21 = this[7];

        this[0] = a[0] * b00 + a[1] * b10;
        this[1] = a[0] * b01 + a[1] * b11;
        this[3] = a[3] * b00 + a[4] * b10;
        this[4] = a[3] * b01 + a[4] * b11;
        this[6] = a[5] * b00 + a[7] * b10 + b20;
        this[7] = a[5] * b01 + a[7] * b11 + b21;

        return this;

    }

}