import ShapeFill from './ShapeFill.js';

export const SOLID = 0;
export const PATTERN = 1;
export const LINEAR_HORIZONTAL = 2;
export const LINEAR_VERTICAL = 3;
export const LINEAR_DIAGONAL = 4;
export const RADIAL = 5;

export default class ShapeStroke extends ShapeFill {

    constructor (shape, type = SOLID) {

        super(shape, type);

    }

    draw (context) {

        if (this.dirty)
        {
            this.updateGradient(context);
        }

        context.strokeStyle = this.style;

        context.stroke();

    }

}
