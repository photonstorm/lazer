import Vec3 from 'math/vector/vec3/Vec3.js';
import Quaternion from 'math/quaternion/Build.js';

export default class Transform {

    constructor (parent = null, x = 0, y = 0, z = 0) {

        //  The game object this component is attached to. A component is always attached to a game object.
        this.gameObject = null;

        //  The name of the object.
        this.name = '';

        //   Should the object be hidden, saved with the scene or modifiable by the user?
        this.hideFlags = false;

        //  Has the transform changed since the last time the flag was set to 'false'?
        this.hasChanged = false;

        //  The parent of the transform.
        this.parent = parent;

        //  Returns the topmost transform in the hierarchy.
        this.root = null;

        //  Position of the transform relative to the parent transform.
        this.localPosition = new Vec3(0, 0, 0);

        //  The rotation of the transform relative to the parent transform's rotation.
        this.localRotation = Quaternion();

        //  The scale of the transform relative to the parent.
        this.localScale = new Vec3(1, 1, 1);

        //  The position of the transform in world space.
        this.position = new Vec3(x, y, z);

        this.children = new Set();

        this.scale = new Vec3(1, 1, 1);

        //  The rotation of the transform in world space stored as a Quaternion.
        this.rotation = Quaternion();

    }

    //  This allows you to iterate over the Transform and get all of the children - sweet! :)
    [Symbol.iterator]() {
        return this.children[Symbol.iterator]();
    }

    set scaleX (value) {

        this.scale[2] = value;

        //  send to children? doesn't this mean every time we tween a scale it will do a child loop?
        //  then again, if we don't, surely the children would be out of sync with their parents?
        //  maybe that's what they need to check? the children check if the parents are dirty?
        //  cheaper than iterating all children maybe?

    }



}
