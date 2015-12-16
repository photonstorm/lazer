import Vec2 from 'math/vector/vec2/Build.js';

//  Generates a Position compatible object that is bound to a parent Transform
//  It doesn't care what type of Transform it is bound to, as long as it exposes
//  an `immediate` boolean and an `update` method.

export default function Position (x = 0, y = 0) {

    let position = Vec2(x, y);

    return {

        name: 'position',

        parent: undefined,

        getX () {
            return position[0];
        },

        getY () {
            return position[1];
        },

        setX (value) {

            if (position[0] !== value)
            {
                position[0] = value;
                this.parent.setDirty();
            }

        },

        setY (value) {

            if (position[1] !== value)
            {
                position[1] = value;
                this.parent.setDirty();
            }

        },

        setParent (parent) {

            this.parent = parent;

            Object.defineProperty(parent, 'x', { get: () => this.getX(), set: value => this.setX(value) });
            Object.defineProperty(parent, 'y', { get: () => this.getY(), set: value => this.setY(value) });

        },

        destroy () {

            position = undefined;
            this.parent = undefined;

        }

    };

}
