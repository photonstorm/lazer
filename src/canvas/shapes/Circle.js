import Shape from 'canvas/shapes/Shape.js';

export default class Circle extends Shape {

    constructor (config) {

        super(config);

    }

    draw (ctx, i) {

        if (!this.visible)
        {
            return;
        }

        this.startDraw(ctx, i);

        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);

        this.endDraw(ctx);

    }

}