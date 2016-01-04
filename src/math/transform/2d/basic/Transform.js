import Mat23 from 'math/matrix/mat23/Build.js';
import Scale from 'math/transform/2d/components/Scale.js';
import Position from 'math/transform/2d/components/Position.js';
import Rotation from 'math/transform/2d/components/Rotation.js';
import RotationAnchor from 'math/transform/2d/components/RotationAnchor.js';

//  A Basic 2D Transform class
//  Components: Position, Scale, Rotation and RotationAnchor, baked to a Mat23
//  Supports: immediate and deferred update (defaults to deferred)

export default class Transform {

    constructor (x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {

        this.position = new Position(this, x, y);
        this.scale = new Scale(this, scaleX, scaleY);
        this.rotation = new Rotation(this, rotation);
        this.rotationAnchor = new RotationAnchor(this, 0, 0);

        this.local = Mat23(scaleX, 0, 0, scaleY, x, y);

        //  Immediate or deferred update?
        //  If deferred (false) then 'update' is called before setTransform if dirty=true
        this.immediate = false;

        //  If immediate is false then the dirty flag gets set instead and 'update' is called in 'setTransform'
        this.dirty = true;

    }

    //  Inject the transform properties to the given target
    addProperties (target) {

        //  Property getter/setter injection
        this.position.addProperties(target);
        this.rotation.addProperties(target);

        //  Component references
        target.position = this.position;
        target.scale = this.scale;
        target.rotationAnchor = this.rotationAnchor;

        return target;

    }

    setDirty () {

        if (this.immediate)
        {
            this.updateTransform();
        }
        else
        {
            this.dirty = true;
        }

        return this;

    }

    updateTransform () {

        if (this.rotation.isFast)
        {
            //  Fast (no rotation)
            this.local[0] = this.scale[0];
            this.local[1] = 0;
            this.local[2] = 0;
            this.local[3] = this.scale[1];
        }
        else
        {
            this.local[0] = this.rotation.cr * this.scale[0];
            this.local[1] = this.rotation.sr * this.scale[0];
            this.local[2] = -this.rotation.sr * this.scale[1];
            this.local[3] = this.rotation.cr * this.scale[1];
        }

        this.local[4] = this.position[0];
        this.local[5] = this.position[1];

        this.dirty = false;

        return this;

    }

    setTransform (context) {

        if (this.dirty)
        {
            this.updateTransform();
        }

        context.setTransform(
            this.local[0],  // scale x
            this.local[1],  // shear y
            this.local[2],  // shear x
            this.local[3],  // scale y
            this.local[4],  // translate x
            this.local[5]   // translate y
        );

        return this;

    }

    destroy () {

        this.position.destroy();
        this.scale.destroy();
        this.rotation.destroy();
        this.rotationAnchor.destroy();

        this.local = undefined;

    }

}
