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
            let s = this.components.scale;
            let p = this.components.position;

            if (r.fast)
            {
                //  Fast (no rotation)
                local[0] = s.x;
                local[1] = 0;
                local[2] = 0;
                local[3] = s.y;
                local[4] = p.x;
                local[5] = p.y;
            }
            else
            {
                local[0] = r.cr * s.x;
                local[1] = r.sr * s.x;
                local[2] = -r.sr * s.y;
                local[3] = r.cr * s.y;
                local[4] = p.x;
                local[5] = p.y;
            }

            this.dirty = false;

        },

        setTransform (context) {

            if (this.dirty)
            {
                this.update();
            }

            // console.log('setTransform', local);

            context.setTransform(local[0], local[1], local[2], local[3], local[4], local[5]);

        },

        addComponent (component) {

            this.components[component.name] = component;

            component.setParent(this);

        }

    };

    //  Inject our components into the transform
    //  They automatically add in transform level getters and setters

    transform.addComponent(Position(x, y));
    transform.addComponent(Scale(scaleX, scaleY));
    transform.addComponent(Rotation(rotation));

    return transform;

}
