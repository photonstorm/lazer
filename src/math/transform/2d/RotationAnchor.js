import Vec2 from 'math/vector/vec2/Build.js';

//  Generates a RotationAnchor compatible object that is bound to a parent Transform
//  It doesn't care what type of Transform it is bound to, as long as it exposes
//  an `immediate` boolean and an `update` method.

export default function RotationAnchor (parent = undefined, x = 0, y = 0) {

    let anchor = Vec2(x, y);

    return {

        parent: parent,

        get x () {
            return anchor[0];
        },

        get y () {
            return anchor[1];
        },

        set x (value) {

            if (anchor[0] !== value)
            {
                anchor[0] = value;
                parent.setDirty();
            }

        },

        set y (value) {

            if (anchor[1] !== value)
            {
                anchor[1] = value;
                parent.setDirty();
            }

        },

        destroy () {

            anchor = undefined;
            parent = undefined;

        }

    };

}
