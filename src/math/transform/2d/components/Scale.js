import BaseTransformComponent from 'math/transform/2d/components/BaseTransformComponent.js';

export default class Scale extends BaseTransformComponent {

    constructor (transform, x = 0, y = 0) {

        super(transform, x, y);

    }

    addProperties (target) {

        if (!target.hasOwnProperty('scale'))
        {
            target.scale = {};
        }

        Object.defineProperties(target.scale, {

            'x': {
                enumerable: true,
                get: () => this.getX(),
                set: (value) => this.setX(value)
            },

            'y': {
                enumerable: true,
                get: () => this.getY(),
                set: (value) => this.setY(value)
            }

        });

    }

}
