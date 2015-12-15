import Vec2 from 'math/vector/vec2/Build.js';

//  Generates a Scale compatible object that is bound to a parent Transform
//  It doesn't care what type of Transform it is bound to, as long as it exposes
//  an `immediate` boolean and an `update` method.

export default function Scale (parent = undefined, x = 1, y = 1) {

    let scale = Vec2(x, y);

    return {

        parent: parent,

        get x () {
            return scale[0];
        },

        get y () {
            return scale[1];
        },

        set x (value) {

            if (scale[0] !== value)
            {
                scale[0] = value;

                if (parent.immediate)
                {
                    parent.update();
                }
            }

        },

        set y (value) {

            if (scale[1] !== value)
            {
                scale[1] = value;

                if (parent.immediate)
                {
                    parent.update();
                }
            }

        },

        destroy () {

            scale = undefined;
            parent = undefined;

        }

    };

}
