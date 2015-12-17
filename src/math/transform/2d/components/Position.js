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

        },

        //  In theory this means a single Position component could potentially
        //  update several targets at once (in practice I'm sure that's pointless, but
        //  it's interesting to know)

        addProperties (target) {

            //  TODO: defineProperties instead (plus check things like enumerable, etc)

            Object.defineProperty(target, 'x', { get: () => this.getX(), set: value => this.setX(value) });
            Object.defineProperty(target, 'y', { get: () => this.getY(), set: value => this.setY(value) });

        },

        destroy () {

            position = undefined;
            this.parent = undefined;

        }

    };

}
