import Transform from 'math/transform/2d/standard/Transform.js';

//  A BaseTransform class that you can use when extending a Sprite or other Game Object
//  Hides away the 'private' stuff and exposes only the useful getters and setters

export default class BaseTransform {

    constructor (x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {

        this.transform = new Transform(x, y, rotation, scaleX, scaleY);

        //  Direct component references
        this.position = this.transform.position;
        this.scale = this.transform.scale;
        this.pivot = this.transform.pivot;
        this.rotationAnchor = this.transform.rotationAnchor;

    }

    get x () {

        return this.position.getX();

    }

    get y () {

        return this.position.getY();

    }

    get rotation () {

        return this.transform.rotation.getValue();

    }

    set x (value) {

        return this.position.setX(value);

    }

    set y (value) {

        return this.position.setY(value);

    }

    set rotation (value) {

        return this.transform.rotation.setValue(value);

    }

}