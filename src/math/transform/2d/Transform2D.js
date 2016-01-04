import Mat23 from 'math/matrix/mat23/Build.js';
import Vec2 from 'math/vector/vec2/Build.js';

//  A basic 2D Transform class.
//  No scene graph support (no parenting or children)
//  Only position, scale, rotation and pivot supported.

const PI2 = Math.PI * 2;

export default class Transform2D {

    constructor (x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {

        //  Our local objects (array instances, not classes)
        this._pos = Vec2(x, y);
        this._scale = Vec2(scaleX, scaleY);
        this._pivot = Vec2(0, 0);
        this._rotation = rotation;
        this._rotationAnchor = Vec2(0, 0);

        //  pre-calc stuff
        this._prevRotation = rotation - 1;
        this._sinR = 0;
        this._cosR = 0;

        this.local = Mat23(scaleX, 0, 0, scaleY, x, y);

        this.update();

    }

    getPositionX () {

        return this._pos[0];

    }

    getPositionY () {

        return this._pos[1];

    }

    getScaleX () {

        return this._scale[0];

    }

    getScaleY () {

        return this._scale[1];

    }

    getPivotX () {

        return this._pivot[0];

    }

    getPivotY () {

        return this._pivot[1];

    }

    getRotation () {

        return this._rotation;

    }

    getRotationAnchorX () {

        return this._rotationAnchor[0];

    }

    getRotationAnchorY () {

        return this._rotationAnchor[1];

    }

    setPositionX (value) {

        if (this._pos[0] !== value)
        {
            this._pos[0] = value;
            this.update();
        }

        return this;

    }

    setPositionY (value) {

        if (this._pos[1] !== value)
        {
            this._pos[1] = value;
            this.update();
        }

        return this;

    }

    setRotation (value) {

        if (this._rotation !== value)
        {
            this._rotation = value;
            this.update();
        }

        return this;

    }

    setScaleX (value) {

        if (this._scale[0] !== value)
        {
            this._scale[0] = value;
            this.update();
        }

        return this;

    }

    setScaleY (value) {

        if (this._scale[1] !== value)
        {
            this._scale[1] = value;
            this.update();
        }

        return this;

    }

    setPivotX (value) {

        if (this._pivot[0] !== value)
        {
            this._pivot[0] = value;
            this.update();
        }

        return this;

    }

    setPivotY (value) {

        if (this._pivot[1] !== value)
        {
            this._pivot[1] = value;
            this.update();
        }

        return this;

    }

    setRotationAnchorX (value) {

        if (this._rotationAnchor[0] !== value)
        {
            this._rotationAnchor[0] = value;
            this.update();
        }

        return this;

    }

    setRotationAnchorY (value) {

        if (this._rotationAnchor[1] !== value)
        {
            this._rotationAnchor[1] = value;
            this.update();
        }

        return this;

    }

    update () {

        if (this._rotation % PI2)
        {
            //  Cached (rotation)
            if (this._rotation !== this._prevRotation)
            {
                this._sinR = Math.sin(this._rotation);
                this._cosR = Math.cos(this._rotation);
            }

            this.local[0] = this._cosR * this._scale[0];
            this.local[1] = this._sinR * this._scale[0];
            this.local[2] = -this._sinR * this._scale[1];
            this.local[3] = this._cosR * this._scale[1];
            this.local[4] = this._pos[0] - this._pivot[0] * this.local[0] + this._pivot[1] * this.local[2];
            this.local[5] = this._pos[1] - this._pivot[0] * this.local[1] + this._pivot[1] * this.local[3];
        }
        else
        {
            //  Fast (no rotation)
            this.local[0] = this._scale[0];
            this.local[1] = 0;
            this.local[2] = 0;
            this.local[3] = this._scale[1];
            this.local[4] = this._pos[0] - this._pivot[0] * this._scale[0];
            this.local[5] = this._pos[1] - this._pivot[1] * this._scale[1];
        }

        return this;

    }

    addProperties (target) {

        Object.defineProperties(target, {

            'x': {
                enumerable: true,
                get: () => this.getPositionX(),
                set: (value) => this.setPositionX(value)
            },

            'y': {
                enumerable: true,
                get: () => this.getPositionY(),
                set: (value) => this.setPositionY(value)
            }

        });

        target.scale = {};

        Object.defineProperties(target.scale, {

            'x': {
                enumerable: true,
                get: () => this.getScaleX(),
                set: (value) => this.setScaleX(value)
            },

            'y': {
                enumerable: true,
                get: () => this.getScaleY(),
                set: (value) => this.setScaleY(value)
            }

        });

        return target;

    }

    setTransform (context) {

        context.setTransform(this.local[0], this.local[1], this.local[2], this.local[3], this.local[4], this.local[5]);

        return this;

    }

}
