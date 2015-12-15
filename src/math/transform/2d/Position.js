import Vec2 from 'math/vector/vec2/Build.js';

//  Generates a Position compatible object that is bound to a parent Transform
//  It doesn't care what type of Transform it is bound to, as long as it exposes
//  an `immediate` boolean and an `update` method.

export default function Position (parent = undefined, x = 0, y = 0) {

    let position = Vec2(x, y);

    return {

        parent: parent,

        getX () {
            return position[0];
        },

        getY () {
            return position[1];
        },

        get x () {
            return position[0];
        },

        get y () {
            return position[1];
        },

        set x (value) {

            if (position[0] !== value)
            {
                position[0] = value;

                if (parent.immediate)
                {
                    parent.update();
                }
            }

        },

        set y (value) {

            if (position[1] !== value)
            {
                position[1] = value;

                if (parent.immediate)
                {
                    parent.update();
                }
            }

        },

        destroy () {

            position = undefined;
            parent = undefined;

        }

    };

}
