import Shape from './Shape.js';

export default class Star extends Shape {

    constructor (config) {

        super(config);

        this._points = 0;
        this._pointsScaled = 0;
        this._pointsAngle = 0;

        this.innerRadius = config.innerRadius || 32;
        this.outerRadius = config.outerRadius || 64;
        this.points = config.points || 5;

    }

    get points () {

        return this._points;

    }

    set points (value) {

        this._points = value;
        this._pointsScaled = value * 2;
        this._pointsAngle = Math.PI * 2 / value / 2;

    }

    draw (ctx, i) {

        if (!this.visible)
        {
            return;
        }

        this.startDraw(ctx, i);

        ctx.moveTo(this.outerRadius, 0);

        for (let i = 1; i < this._pointsScaled; i++)
        {
            let angle = this._pointsAngle * i;
            let r = (i % 2) ? this.innerRadius : this.outerRadius;
            ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        }

        ctx.lineTo(this.outerRadius, 0);

        this.endDraw(ctx);

    }

}