
//  It doesn't care what type of Transform it is bound to, 
//  as long as it exposes a `setDirty` method.

//  This class is compatible with the Vec2 data types, so can be passed to any
//  function that will accept a Vec2.

export default class BaseTransformComponent {

    constructor (transform, x = 0, y = 0) {

        this.transform = transform;

        this[0] = x;
        this[1] = y;

        //  Old values (for interpolation based Transforms)
        this[2] = x;
        this[3] = y;

    }

    getX () {

        return this[0];

    }

    getY () {

        return this[1];

    }

    getDeltaX (i = 0) {

        return (this[2] + (this[0] - this[2]) * i);

    }

    getDeltaY (i = 0) {

        return (this[3] + (this[1] - this[3]) * i);

    }

    setX (value) {

        if (this[0] !== value)
        {
            this[2] = this[0];
            this[0] = value;
            this.transform.setDirty();
        }

    }

    setY (value) {

        if (this[1] !== value)
        {
            this[3] = this[1];
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

        this[2] = this[0];
        this[3] = this[1];

        this[0] = x;
        this[1] = y;

        this.transform.setDirty();

    }

    resetX (value) {

        this[0] = value;
        this[2] = value;

        this.transform.setDirty();

    }

    resetY (value) {

        this[1] = value;
        this[3] = value;

        this.transform.setDirty();

    }

    reset (x, y = x) {

        this[0] = x;
        this[1] = y;
        this[2] = x;
        this[3] = y;

        this.transform.setDirty();

    }

    setTransform (transform) {

        this.transform = transform;

    }

    destroy () {

        this.transform = undefined;

    }

}
