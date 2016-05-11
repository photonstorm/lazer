import Mat23 from '../../../matrix/mat23/Build.js';
import Scale from '../components/Scale.js';
import Position from '../components/Position.js';

//  A Minimal 2D Transform class

//  Components: Position and Scale, baked to a Mat23
//  Supports: Immediate or Deferred Updates, Interpolation.

export default class Transform {

    constructor (x = 0, y = 0, scaleX = 1, scaleY = 1) {

        this.position = new Position(this, x, y);
        this.scale = new Scale(this, scaleX, scaleY);

        this.local = Mat23(scaleX, 0, 0, scaleY, x, y);

        this.interpolate = false;
        this.immediate = false;
        this.dirty = true;

    }

    //  Inject the transform properties to the given target
    addProperties (target) {

        //  Property getter/setter injection
        this.position.addProperties(target);

        //  Component references
        target.position = this.position;
        target.scale = this.scale;

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

        this.local[0] = this.scale[0];
        this.local[1] = 0;
        this.local[2] = 0;
        this.local[3] = this.scale[1];

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

        this.local = undefined;

    }

}
