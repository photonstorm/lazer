import Vec2 from 'math/vector/vec2/Vec2.js';

//  Likely merged with Transform in the future, but useful as a smaller
//  stand-alone class

export default class Position {

    constructor (x, y) {

        this.now = new Vec2(x, y);
        this.old = new Vec2(x, y);

    }

    get x () {

        return this.now.x;

    }

    set x (value) {

        this.old.x = this.now.x;
        this.now.x = value;

    }

    get y () {

        return this.now.y;

    }

    set y (value) {

        this.old.y = this.now.y;
        this.now.y = value;

    }

    getRenderX (interpolate = false, i = 0) {

        return (interpolate) ? this.getDeltaX(i) : this.now.x;

    }

    getRenderY (interpolate = false, i = 0) {

        return (interpolate) ? this.getDeltaY(i) : this.now.y;

    }

    getDeltaX (i = 0) {

        return (this.old.x + (this.now.x - this.old.x) * i);

    }

    getDeltaY (i = 0) {

        return (this.old.y + (this.now.y - this.old.y) * i);

    }

}