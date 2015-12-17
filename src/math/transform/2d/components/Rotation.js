
const PI2 = Math.PI * 2;

export default function Rotation (rotation = 0) {

    return {

        name: 'rotation',

        parent: undefined,

        value: rotation,

        fast: rotation % PI2,

        sr: 0,
        cr: 0,

        get () {
            return rotation;
        },

        set (value) {

            if (rotation !== value)
            {
                rotation = value;
                fast = value % PI2;

                if (fast)
                {
                    //  Update the cache if the rotation != 0
                    sr = Math.sin(value);
                    cr = Math.cos(value);
                }

                parent.setDirty();
            }

        },

        setParent (parent) {

            this.parent = parent;

            Object.defineProperty(parent, 'rotation', { get: () => this.get(), set: value => this.set(value) });

        },

        destroy () {

            this.parent = undefined;

        }

    };

}
