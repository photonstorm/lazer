import Shape from './Shape.js';

export default function Rectangle (config) {

    let shape = Shape(config);

    shape.draw = function (ctx, i) {

        if (!this.visible)
        {
            return;
        }

        this.startDraw(ctx, i);

        // let dx = this.rotationAnchorX * -this.width;
        // let dy = this.rotationAnchorY * -this.height;

        // ctx.rect(dx, dy, this.width, this.height);

        ctx.rect(0, 0, this.width, this.height);

        this.endDraw(ctx);

    }

    return shape;

}
