import Vec2 from 'math/vector/vec2/Build.js';

//  It doesn't care what type of Transform it is bound to, 
//  as long as it exposes a `setDirty` method.

export default class BaseTransformComponent {

    constructor (transform, x = 0, y = 0) {

        this.transform = transform;
        this._v = Vec2(x, y);

    }

    //  Getters

    getX () {
        return this._v[0];
    }

    getY () {
        return this._v[1];
    }

    get x () {
        return this._v[0];
    }

    get y () {
        return this._v[1];
    }

    //  Setters

    set (x, y = x) {

        this._v[0] = x;
        this._v[1] = y;
        this.transform.setDirty();

    }

    setX (value) {

        if (this._v[0] !== value)
        {
            this._v[0] = value;
            this.transform.setDirty();
        }

    }

    setY (value) {

        if (this._v[1] !== value)
        {
            this._v[1] = value;
            this.transform.setDirty();
        }

    }

    set x (value) {

        if (this._v[0] !== value)
        {
            this._v[0] = value;
            this.transform.setDirty();
        }

    }

    set y (value) {

        if (this._v[1] !== value)
        {
            this._v[1] = value;
            this.transform.setDirty();
        }
    }

    setTransform (transform) {

        this.transform = transform;

    }

    destroy () {

        this._v = undefined;
        this.transform = undefined;

    }

}
