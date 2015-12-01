import Shape from 'canvas/shapes/Shape.js';

export default class Star extends Shape {

    constructor (config) {

        super(config);

        this.innerRadius = config.innerRadius || 25;
        this.outerRadius = config.outerRadius || 50;
        this.points = config.points || 5;

    }

    draw (ctx, i) {

        if (!this.visible)
        {
            return;
        }

        this.startDraw(ctx, i);

        // let dx = this.anchor.x * -this.width;
        // let dy = this.anchor.y * -this.height;

        ctx.moveTo(this.outerRadius, 0);

        for (let i = 1; i < this.points * 2; i++)
        {
            let angle = Math.PI * 2 / this.points / 2 * i;
            let r = (i % 2) ? this.innerRadius : this.outerRadius;
            ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        }

        ctx.lineTo(this.outerRadius, 0);

        this.endDraw(ctx);

    }

}