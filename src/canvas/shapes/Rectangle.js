import Shape from 'canvas/shapes/Shape.js';

export default class Rectangle extends Shape {

    constructor (config) {

        super(config);

    }

    draw (ctx, i) {

        if (!this.visible)
        {
            return;
        }

        this.startDraw(ctx, i);

        ctx.rect(0, 0, this.width, this.height);

        this.endDraw(ctx);

    }

}