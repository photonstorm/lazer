import Vec2 from 'math/vector/vec2/Build.js';

export default function Scale (x = 0, y = 0) {

    let scale = Vec2(x, y);

    return {

        name: 'scale',

        parent: undefined,

        getX () {
            return scale[0];
        },

        getY () {
            return scale[1];
        },

        setX (value) {

            if (scale[0] !== value)
            {
                scale[0] = value;
                this.parent.setDirty();
            }

        },

        setY (value) {

            if (scale[1] !== value)
            {
                scale[1] = value;
                this.parent.setDirty();
            }

        },

        setParent (parent) {

            this.parent = parent;

            Object.defineProperty(parent, 'scaleX', { get: () => this.getX(), set: value => this.setX(value) });
            Object.defineProperty(parent, 'scaleY', { get: () => this.getY(), set: value => this.setY(value) });

        },

        destroy () {

            scale = undefined;
            this.parent = undefined;

        }

    };

}
