//  Everything is unrolled with no method chaining (even if it means duplicate code)

export default class Vec3 {

    constructor (x = 0, y = 0, z = 0) {

        //  This may look ugly, but it allows for seamless exchange between
        //  Vec3, Float32Array and Array data types.

        this[0] = x;
        this[1] = y;
        this[2] = z;

    }

    get x () {
        return this[0];
    }

    get y () {
        return this[1];
    }

    get z () {
        return this[2];
    }

    set x (v) {
        this[0] = v;
    }

    set y (v) {
        this[1] = v;
    }

    set z (v) {
        this[2] = v;
    }

    zero () {

        this[0] = 0;
        this[1] = 0;
        this[2] = 0;

        return this;

    }

    add (v) {

        this[0] += v[0];
        this[1] += v[1];
        this[2] += v[2];

        return this;

    }

    sub (v) {

        this[0] -= v[0];
        this[1] -= v[1];
        this[2] -= v[2];

        return this;

    }

    scale (x, y = x, z = x) {

        this[0] *= x;
        this[1] *= y;
        this[2] *= z;

        return this;

    }

    scaleV (v) {

        this[0] *= v[0];
        this[1] *= v[1];
        this[2] *= v[2];

        return this;

    }

    div (n) {

        this[0] /= n;
        this[1] /= n;
        this[2] /= n;

        return this;

    }

    floor () {

        this[0] = Math.floor(this[0]);
        this[1] = Math.floor(this[1]);
        this[2] = Math.floor(this[2]);

        return this;

    }

    ceil () {

        this[0] = Math.ceil(this[0]);
        this[1] = Math.ceil(this[1]);
        this[2] = Math.ceil(this[2]);

        return this;

    }

    negate () {

        this[0] = -this[0];
        this[1] = -this[1];
        this[2] = -this[2];

        return this;

    }

    normalize () {

        let l = this.length();

        if (l > 0)
        {
            this[0] /= l;
            this[1] /= l;
            this[2] /= l;
        }

        return this;

    }

    perp () {

        let x = this[0];
        let y = this[1];

        this[0] = y;
        this[1] = -x;

        return this;

    }


    dot (v) {

        return this[0] * v[0] + this[1] * v[1] + this[2] * (v[2] || 1);

    }

    lengthSq () {

        return this[0] * this[0] + this[1] * this[1] + this[2] * this[2];

    }

    set length (v) {

        const s = v / Math.sqrt(this[0] * this[0] + this[1] * this[1] + this[2] * this[2]);

        this[0] *= s;
        this[1] *= s;
        this[2] *= s;

    }

    get length () {

        return Math.sqrt(this[0] * this[0] + this[1] * this[1] + this[2] * this[2]);

    }

    lengthManhattan () {

        return Math.abs(this[0]) + Math.abs(this[1]) + Math.abs(this[2]);

    }

    toString () {

        return `[Vec2 (x=${this[0]}, y=${this[1]})]`;

    }

}