import DegToRad from '../math/DegToRad.js';
import RadToDeg from '../math/RadToDeg.js';
import Wrap from '../math/Wrap.js';
import Vec2 from '../math/vector/vec2/Build.js';
import Mat33 from '../math/matrix/mat33/Mat33.js';

//  A 2D specific Transform object (based on the Unity Transform object)

export default class Transform2D {

    constructor (gameObject, parent = null, x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {

        //  The game object this component is attached to. A component is always attached to a game object.
        this.gameObject = gameObject;

        //  The name of the object.
        this.name = '';

        //   Should the object be hidden, saved with the scene or modifiable by the user? (UI level flag)
        this.hideFlags = false;

        //  Has the transform changed?
        this.dirty = false;

        //  The parent of the transform (set at the end of the constructor)
        this.parent = null;

        //  Returns the topmost transform in the hierarchy.
        this.root = null;

        //  Is this a root Transform? (can never be if it has a parent)
        this.isRoot = (parent) ? false : true;

        this._position = Vec2(x, y);
        this._scale = Vec2(scaleX, scaleY);
        this._rotation = rotation;

        this._local = new Mat33();

        //  for interpolation
        this.interpolate = true;

        this._oldPosition = Vec2(x, y);
        this._oldScale = Vec2(scaleX, scaleY);
        this._oldRotation = rotation;
        this._drawMatrix = new Mat33();

        //  Because they need to be unique and a Set provides this for us
        this.children = new Set();

        //  However this maintains the drawing order, not the Set
        this.drawList = [];

        if (parent)
        {
            parent.add(this);
        }

        this.update();

    }

    //  This allows you to iterate over the Transform and get all of the children - sweet! :)
    [Symbol.iterator]() {
        return this.children[Symbol.iterator]();
    }

    //  Getters

    get x () {
        return this._position[0];
    }

    get y () {
        return this._position[1];
    }

    get scaleX () {
        return this._scale[0];
    }

    get scaleY () {
        return this._scale[1];
    }

    get rotation () {
        return this._rotation;
    }

    getRenderX (i = 1) {

        return (this._oldPosition[0] + (this._position[0] - this._oldPosition[0]) * i);

    }

    getRenderY (i = 1) {

        return (this._oldPosition[1] + (this._position[1] - this._oldPosition[1]) * i);

    }

    getRenderScaleX (i = 1) {

        return (this._oldScale[0] + (this._scale[0] - this._oldScale[0]) * i);

    }

    getRenderScaleY (i = 1) {

        return (this._oldScale[1] + (this._scale[1] - this._oldScale[1]) * i);

    }

    getRenderRotation (i = 1) {

        return (this._oldRotation + (this._rotation - this._oldRotation) * i);

    }

    //  Setters

    set x (value) {

        if (value !== this._position[0])
        {
            this._oldPosition[0] = this._position[0];
            this._position[0] = value;
            this.update();
        }

    }

    set y (value) {

        if (value !== this._position[1])
        {
            this._oldPosition[1] = this._position[1];
            this._position[1] = value;
            this.update();
        }

    }

    set scaleX (value) {

        if (value !== this._scale[0])
        {
            this._oldScale[0] = this._scale[0];
            this._scale[0] = value;
            this.update();
        }

    }

    set scaleY (value) {

        if (value !== this._scale[1])
        {
            this._oldScale[1] = this._scale[1];
            this._scale[1] = value;
            this.update();
        }

    }

    set rotation (radians) {

        if (radians !== this._rotation)
        {
            this._oldRotation = this._rotation;
            this._rotation = radians;
            this.update();
        }

    }

    //  Immediately sets the position + clears the interpolation value
    setPosition (x, y = x) {

        this._oldPosition[0] = x;
        this._oldPosition[1] = y;
        this._position[0] = x;
        this._position[1] = y;
        this.update();

    }

    //  Immediately sets the scale + clears the interpolation value
    setScale (x, y = x) {

        this._oldScale[0] = x;
        this._oldScale[1] = y;
        this._scale[0] = x;
        this._scale[1] = y;
        this.update();

    }

    //  Immediately sets the rotation + clears the interpolation value
    setRotation (value) {

        this._oldRotation = value;
        this._rotation = value;
        this.update();

    }

    setParent (parent) {

        if (this.parent !== parent)
        {
            let oldParent = this.parent;

            this.parent = parent;
            this.root = parent.root;

            this.isRoot = false;

            //  parent update
        }

    }

    //  Adds the Transform as a child of this one and automatically
    //  updates its original parent.
    add (transform) {

        if (!this.children.has(transform))
        {
            let oldParent = transform.parent;

            this.children.add(transform);
            this.drawList.push(transform);

            transform.parent = this;
            transform.root = this.root;

            //  Update transforms children

            for (let child of transform.children)
            {
                child.root = this.root;
            }

            // transform.update();

            //  Notify parent
            if (oldParent)
            {
                oldParent.remove(transform);
            }
        }

        return this;

    }

    update () {

        this._local.transform(this._position[0], this._position[1], this._rotation, this._scale[0], this._scale[1]);

        if (this.parent)
        {
            this._local.multiply(this.parent._local);
        }

        for (let i = 0; i < this.drawList.length; i++)
        {
            this.drawList[i].update();
        }

        this.dirty = true;

    }

    draw (i = 1) {

        //  Unrolled getRender functions
        this._drawMatrix.transform(
            this._oldPosition[0] + (this._position[0] - this._oldPosition[0]) * i,
            this._oldPosition[1] + (this._position[1] - this._oldPosition[1]) * i,
            this._oldRotation + (this._rotation - this._oldRotation) * i,
            this._oldScale[0] + (this._scale[0] - this._oldScale[0]) * i,
            this._oldScale[1] + (this._scale[1] - this._oldScale[1]) * i
        );

        if (this.parent)
        {
            this._drawMatrix.multiply(this.parent._drawMatrix);
        }

        this._oldPosition[0] = this._position[0];
        this._oldPosition[1] = this._position[1];
        this._oldRotation = this._rotation;
        this._oldScale[0] = this._scale[0];
        this._oldScale[1] = this._scale[1];

        return this._drawMatrix;
        // return this._local;

    }

    remove (transform) {

        if (this.children.has(transform))
        {
            this.children.delete(transform);
        }

        return this;

    }

}
