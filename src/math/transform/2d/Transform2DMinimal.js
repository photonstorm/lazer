import Mat23 from 'math/matrix/mat23/Build.js';

import Scale from 'math/transform/2d/Scale.js';
import Position from 'math/transform/2d/Position.js';
import Rotation from 'math/transform/2d/Rotation.js';

//  A basic 2D Transform class.
//  No scene graph support (no parenting or children)
//  Only position, scale and rotation supported.

export default function Transform2DMinimal (x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {

    let local = Mat23();

    let transform = {

        //  Immediate or deferred update?
        //  If deferred (false) it's up to you to call 'update' before setTransform
        immediate: true,

        //  If we don't want these to be "public" in the object, we can move to 'let' props like local is
        position: undefined,
        scale: undefined,
        rotation: undefined,

        get x () {
            return this.position.x;
        },

        set x (value) {
            this.position.x = value;
        },

        get y () {
            return this.position.y;
        },

        update () {

            if (this.rotation.fast)
            {
                //  Fast (no rotation)
                local[0] = this.scale.x;
                local[1] = 0;
                local[2] = 0;
                local[3] = this.scale.y;
                local[4] = this.position.x;
                local[5] = this.position.y;
            }
            else
            {
                local[0] = this.rotation.cr * this.scale.x;
                local[1] = this.rotation.sr * this.scale.x;
                local[2] = -this.rotation.sr * this.scale.y;
                local[3] = this.rotation.cr * this.scale.y;
                local[4] = this.position.x;
                local[5] = this.position.y;
            }

        },

        setTransform (context) {

            context.setTransform(local[0], local[1], local[2], local[3], local[4], local[5]);

        }

    };

    //  Inject our components now that the transform object is created
    transform.position = Position(transform, x, y);
    transform.scale = Scale(transform, scaleX, scaleY);
    transform.rotation = Rotation(transform, rotation);

    return transform;

}
