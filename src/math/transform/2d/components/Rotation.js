import { PI2 } from 'math/Constants.js';

export default class Rotation {

    constructor (transform, rotation = 0) {

        this.transform = transform;
        this._v = rotation;
        this.fast = rotation % PI2;

        this.sr = 0;
        this.cr = 0;

    }

    getValue () {
        return this._v;
    }

    setValue (value) {

        if (this._v !== value)
        {
            this._v = value;
            this.fast = value % PI2;

            if (this.fast)
            {
                //  Update the cache if the rotation != 0
                this.sr = Math.sin(value);
                this.cr = Math.cos(value);
            }

            this.transform.setDirty();
        }

    }

    setTransform (transform) {

        this.transform = transform;

    }

    addProperties (target) {

        Object.defineProperties(target, {

            'rotation': {
                enumerable: true,
                get: () => this.getValue(),
                set: (value) => this.setValue(value)
            }

        });

    }

    destroy () {

        this._v = undefined;
        this.transform = undefined;

    }

}
