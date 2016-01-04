import { PI2 } from 'math/Constants.js';

export default class Rotation {

    constructor (transform, rotation = 0) {

        this.transform = transform;

        this[0] = rotation;
        this[1] = rotation % PI2;

        this.sr = 0;
        this.cr = 0;

    }

    getValue () {

        return this[0];

    }

    setValue (value) {

        if (this[0] !== value)
        {
            this[0] = value;
            this[1] = value % PI2;

            if (this[1])
            {
                //  Update the cache if the rotation != 0
                this.sr = Math.sin(value);
                this.cr = Math.cos(value);
            }

            this.transform.setDirty();
        }

    }

    get isFast () {

        return (this[1] === 0);

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

        this.transform = undefined;

    }

}
