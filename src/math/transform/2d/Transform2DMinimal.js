import Mat23 from 'math/matrix/mat23/Build.js';

import Scale from 'math/transform/2d/components/Scale.js';
import Position from 'math/transform/2d/components/Position.js';
import Rotation from 'math/transform/2d/components/Rotation.js';

//  A basic 2D Transform class.
//  No scene graph support (no parenting or children)
//  Only position, scale and rotation supported.

export default function Transform2DMinimal (x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {

    let transform = {

        local: Mat23(),

        //  Immediate or deferred update?
        //  If deferred (false) then 'update' is called before setTransform if dirty=true
        immediate: true,

        //  If immediate is false then the dirty flag gets set instead and 'update' is called in 'setTransform'
        dirty: false,

        //  The transform components (see addComponent)
        components: {},

        setDirty () {

            if (this.immediate)
            {
                this.update();
            }
            else
            {
                this.dirty = true;
            }

        },

        update () {

            let r = this.components.rotation;
            let t = this.local;

            if (r.fast === 0)
            {
                //  Fast (no rotation)
                t[0] = this.scaleX;
                t[1] = 0;
                t[2] = 0;
                t[3] = this.scaleY;
            }
            else
            {
                t[0] = r.cr * this.scaleX;
                t[1] = r.sr * this.scaleX;
                t[2] = -r.sr * this.scaleY;
                t[3] = r.cr * this.scaleY;
            }

            t[4] = this.x;
            t[5] = this.y;

            this.dirty = false;

        },

        setTransform (context) {

            if (this.dirty)
            {
                this.update();
            }

            context.setTransform(this.local[0], this.local[1], this.local[2], this.local[3], this.local[4], this.local[5]);

        },

        addComponent (component) {

            this.components[component.name] = component;

            component.setParent(this);

        }

    };

    //  Inject our components into the transform object

    //  Should Dimensions be a component? (width / height)

    transform.addComponent(Position(x, y));
    transform.addComponent(Scale(scaleX, scaleY));
    transform.addComponent(Rotation(rotation));

    return transform;

}
