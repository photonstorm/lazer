import BaseTransformComponent from './BaseTransformComponent.js';

export default class Position extends BaseTransformComponent {

    constructor (transform, x = 0, y = 0) {

        super(transform, x, y);

    }

    addProperties (target) {

        Object.defineProperties(target, {

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
