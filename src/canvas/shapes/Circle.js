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

        //  Needs to be SCALED width / height
        let dx = this.rotationAnchorX * -this.width;
        let dy = this.rotationAnchorY * -this.height;

        ctx.arc(dx, dy, this.radius, 0, 2 * Math.PI);

        this.endDraw(ctx);

    }

}