import Transform from './Transform.js';

//  A BaseTransform class that you can use when extending a Sprite or other Game Object
//  Hides away the 'private' stuff and exposes only the useful getters and setters

export default class BaseTransform {

    constructor (x = 0, y = 0, scaleX = 1, scaleY = 1) {

        this.transform = new Transform(x, y, scaleX, scaleY);

        //  Direct component references
        this.position = this.transform.position;
        this.scale = this.transform.scale;

    }

    get x () {

        return this.position.getX();

    }

    get y () {

        return this.position.getY();

    }

    set x (value) {

        return this.position.setX(value);

    }

    set y (value) {

        return this.position.setY(value);

    }

}