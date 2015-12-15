import Vec2 from 'math/vector/vec2/Build.js';

//  Generates a Pivot compatible object that is bound to a parent Transform
//  It doesn't care what type of Transform it is bound to, as long as it exposes
//  an `immediate` boolean and an `update` method.

export default function Pivot (parent = undefined, x = 0, y = 0) {

    let pivot = Vec2(x, y);

    return {

        parent: parent,

        get x () {
            return pivot[0];
        },

        get y () {
            return pivot[1];
        },

        set x (value) {

            if (pivot[0] !== value)
            {
                pivot[0] = value;

                if (parent.immediate)
                {
                    parent.update();
                }
            }

        },

        set y (value) {

            if (pivot[1] !== value)
            {
                pivot[1] = value;

                if (parent.immediate)
                {
                    parent.update();
                }
            }

        },

        destroy () {

            pivot = undefined;
            parent = undefined;

        }

    };

}
