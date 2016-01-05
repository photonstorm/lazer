import Mat23 from 'math/matrix/mat23/Build.js';
import Scale from 'math/transform/2d/components/Scale.js';
import Pivot from 'math/transform/2d/components/Pivot.js';
import Position from 'math/transform/2d/components/Position.js';
import Rotation from 'math/transform/2d/components/Rotation.js';
import RotationAnchor from 'math/transform/2d/components/RotationAnchor.js';

//  A Standard 2D Transform class

//  Components: Position, Scale, Pivot, Rotation and RotationAnchor, baked to a Mat23
//  Supports: Immediate or Deferred Updates, Interpolation.

export default class Transform {

    constructor (x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {

        this.position = new Position(this, x, y);
        this.scale = new Scale(this, scaleX, scaleY);
        this.pivot = new Pivot(this, 0, 0);
        this.rotation = new Rotation(this, rotation);
        this.rotationAnchor = new RotationAnchor(this, 0, 0);

        this.local = Mat23(scaleX, 0, 0, scaleY, x, y);

        this.interpolate = false;
        this.immediate = false;
        this.dirty = true;

    }

    //  Inject the transform properties to the given target
    addProperties (target) {

        //  Property getter/setter injection
        this.position.addProperties(target);
        this.rotation.addProperties(target);

        //  Component references
        target.position = this.position;
        target.pivot = this.pivot;
        target.scale = this.scale;
        target.rotationAnchor = this.rotationAnchor;

        return target;

    }

    enableImmediateUpdates () {

        this.immediate = true;

        return this;

    }

    disableImmediateUpdates () {

        this.immediate = false;
        this.dirty = true;

        return this;

    }

    enableInterpolation () {

        this.interpolate = true;

        this.position.reset(this.position.x, this.position.y);
        this.scale.reset(this.scale.x, this.scale.y);

        return this;

    }

    disableInterpolation () {

        this.interpolate = false;

        return this;

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

    updateTransform (i = 1) {

        let tx = (this.interpolate) ? this.position.getDeltaX(i) : this.position[0];
        let ty = (this.interpolate) ? this.position.getDeltaY(i) : this.position[1];

        if (this.rotation.isFast)
        {
            //  Fast (no rotation)
            this.local[0] = this.scale[0];
            this.local[1] = 0;
            this.local[2] = 0;
            this.local[3] = this.scale[1];
            this.local[4] = tx - this.pivot[0] * this.scale[0];
            this.local[5] = ty - this.pivot[1] * this.scale[1];
        }
        else
        {
            this.local[0] = this.rotation.cr * this.scale[0];       // a
            this.local[1] = this.rotation.sr * this.scale[0];       // b
            this.local[2] = -this.rotation.sr * this.scale[1];      // c
            this.local[3] = this.rotation.cr * this.scale[1];       // d
            this.local[4] = tx - this.pivot[0] * this.local[0] + this.pivot[1] * this.local[2];
            this.local[5] = ty - this.pivot[0] * this.local[1] + this.pivot[1] * this.local[3];
        }

        this.dirty = false;

        return this;

    }

    destroy () {

        this.position.destroy();
        this.scale.destroy();
        this.pivot.destroy();
        this.rotation.destroy();
        this.rotationAnchor.destroy();

        this.local = undefined;

    }

}
