import Mat23 from '../../../matrix/mat23/Build.js';
import Scale from '../components/Scale.js';
import Position from '../components/Position.js';
import Rotation from '../components/Rotation.js';
import RotationAnchor from '../components/RotationAnchor.js';

//  A Basic 2D Transform class

//  Components: Position, Scale, Rotation and RotationAnchor, baked to a Mat23
//  Supports: Immediate or Deferred Updates, Interpolation.

export default class Transform {

    constructor (x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {

        this.position = new Position(this, x, y);
        this.scale = new Scale(this, scaleX, scaleY);
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

        if (this.interpolate)
        {
            this.local[4] = this.position.getDeltaX(i);
            this.local[5] = this.position.getDeltaY(i);
        }
        else
        {
            this.local[4] = this.position[0];
            this.local[5] = this.position[1];
        }

        this.dirty = false;

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
