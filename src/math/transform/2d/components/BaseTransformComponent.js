
//  It doesn't care what type of Transform it is bound to, 
//  as long as it exposes a `setDirty` method.

//  This class is compatible with the Vec2 data types, so can be passed to any
//  function that will accept a Vec2.

export default class BaseTransformComponent {

    constructor (transform, x = 0, y = 0) {

        this.transform = transform;

        this[0] = x;
        this[1] = y;

    }

    getX () {

        return this[0];

    }

    getY () {

        return this[1];

    }

    setX (value) {

        if (this[0] !== value)
        {
            this[0] = value;
            this.transform.setDirty();
        }

    }

    setY (value) {

        if (this[1] !== value)
        {
            this[1] = value;
            this.transform.setDirty();
        }

    }

    //  Native getters / setters

    get x () {

        return this[0];

    }

    get y () {

        return this[1];

    }

    set x (value) {

        this.setX(value);

    }

    set y (value) {

        this.setY(value);

    }

    set (x, y = x) {

        this[0] = x;
        this[1] = y;

        this.transform.setDirty();

    }

    setTransform (transform) {

        this.transform = transform;

    }

    destroy () {

        this[0] = 0;
        this[1] = 0;
        this.transform = undefined;

    }

}
