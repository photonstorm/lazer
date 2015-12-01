import DegToRad from 'math/DegToRad.js';
import RadToDeg from 'math/RadToDeg.js';
import Wrap from 'math/Wrap.js';
import Vec2 from 'math/vector/vec2/Vec2.js';
import Position from 'components/Position.js';

export default class Shape extends Position {

    constructor ({
                    x = 0,
                    y = 0,
                    width = 0, 
                    height = 0,
                    rotation = 0,
                    stroke = '',
                    fill = '',
                    strokeFirst = false,
                    radius = 0,
                    startAngle = 0,
                    endAngle = 360,
                    antiClockwise = false,
                    angle = 0,
                    anchor = null,
                    anchorX = 0,
                    anchorY = 0,
                    lineWidth = 1,
                    lineCap = 'butt',
                    lineJoin = 'bevel',
                    miterLimit = 10,
                    lineDashSegments = null,
                    lineDashOffset = 0,
                    interpolate = true,
                    subPixelAdjust = true,
                    visible = true
                } = {})
    {

        super(x, y);

        this.visible = visible;

        this.anchor = new Vec2(anchorX, anchorY);

        if (anchor !== null)
        {
            this.anchor.set(anchor);
        }

        this.width = width;
        this.height = height;

        //  Arc / Circle specific
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.antiClockwise = antiClockwise;

        if (radius !== 0)
        {
            this.width = radius * 2;
            this.height = radius * 2;
        }

        //  rads
        this.rotation = rotation;

        //  degs
        if (angle !== 0)
        {
            this.angle = angle;
        }

        this.stroke = false;

        if (stroke !== '')
        {
            this.stroke = true;
            this.strokeStyle = stroke;
        }

        this.fill = false;

        if (fill !== '')
        {
            this.fill = true;
            this.fillStyle = fill;
        }

        this.strokeFirst = strokeFirst;

        this.lineWidth = lineWidth;
        this.lineCap = lineCap;
        this.lineJoin = lineJoin;
        this.miterLimit = miterLimit;

        this.lineDashSegments = lineDashSegments;
        this.lineDashOffset = lineDashOffset;

        this.interpolate = interpolate;
        this.subPixelAdjust = subPixelAdjust;

    }

    lineDash(segments, offset = 0) {

        this.lineDashSegments = segments;
        this.lineDashOffset = offset;

    }

    set angle (value) {

        this.rotation = DegToRad(Wrap(value, 0, 360));

    }

    get angle () {

        return RadToDeg(this.rotation);

    }

    fillColor (r, g, b, a = 1) {

        this.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

    }

    strokeColor (r, g, b, a = 1) {

        this.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

    }

    startDraw (ctx, i) {

        ctx.save();

        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = this.lineCap;
        ctx.lineJoin = this.lineJoin;
        ctx.miterLimit = this.miterLimit;

        if (this.lineDashSegments)
        {
            ctx.setLineDash(this.lineDashSegments);
            ctx.lineDashOffset = this.lineDashOffset;
        }

        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;

        let tx = this.getRenderX(this.interpolate, i);
        let ty = this.getRenderY(this.interpolate, i);

        if (this.subPixelAdjust && this.lineWidth % 2)
        {
            tx -= 0.5;
            ty -= 0.5;
        }

        // tx = this.position.x - this.pivot.x * a;
        // ty = this.position.y - this.pivot.y * d;

        ctx.translate(tx, ty);
        ctx.rotate(this.rotation);

        ctx.beginPath();

    }

    endDraw (ctx) {

        ctx.closePath();

        if (this.strokeFirst)
        {
            if (this.stroke)
            {
                ctx.stroke();
            }

            if (this.fill)
            {
                ctx.fill();
            }
        }
        else
        {
            if (this.fill)
            {
                ctx.fill();
            }

            if (this.stroke)
            {
                ctx.stroke();
            }
        }

        ctx.restore();

    }

}