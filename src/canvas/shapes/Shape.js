import DegToRad from 'math/DegToRad.js';
import RadToDeg from 'math/RadToDeg.js';
import Wrap from 'math/Wrap.js';
import Vec2 from 'math/vector/vec2/Vec2.js';
import ShapeFill from 'canvas/shapes/ShapeFill.js';
import ShapeStroke from 'canvas/shapes/ShapeStroke.js';
import Transform2D from 'components/Transform2D.js';

export default class Shape extends Transform2D {

    constructor ({
                    x = 0,
                    y = 0,
                    width = 0, 
                    height = width,
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
                    scaleX = 1,
                    scaleY = 1,
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

        super(this, null, x, y, rotation, scaleX, scaleY);

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
        // this.rotation = rotation;

        //  degs
        if (angle !== 0)
        {
            this.angle = angle;
        }

        this.lineWidth = lineWidth;
        this.lineCap = lineCap;
        this.lineJoin = lineJoin;
        this.miterLimit = miterLimit;

        this.lineDashSegments = lineDashSegments;
        this.lineDashOffset = lineDashOffset;

        this.interpolate = interpolate;
        this.subPixelAdjust = subPixelAdjust;

        this.fills = [];

        if (strokeFirst)
        {
            if (stroke !== '')
            {
                let strokeFill = this.addStroke();
                strokeFill.setSolid(stroke);
            }

            if (fill !== '')
            {
                let shapeFill = this.addFill();
                shapeFill.setSolid(fill);
            }
        }
        else
        {
            if (fill !== '')
            {
                let shapeFill = this.addFill();
                shapeFill.setSolid(fill);
            }

            if (stroke !== '')
            {
                let strokeFill = this.addStroke();
                strokeFill.setSolid(stroke);
            }
        }

    }

    addFill () {

        let fill = new ShapeFill(this);

        this.fills.push(fill);

        return fill;

    }

    addStroke () {

        let stroke = new ShapeStroke(this);

        this.fills.push(stroke);

        return stroke;

    }

    getFill (index = 0) {

        return this.fills[index];

    }

    lineDash (segments, offset = 0) {

        this.lineDashSegments = segments;
        this.lineDashOffset = offset;

    }

    set angle (value) {

        this.rotation = DegToRad(Wrap(value, 0, 360));

    }

    get angle () {

        return RadToDeg(this.rotation);

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

        // let tx = this.getRenderX(this.interpolate, i) + (this.anchor.x * -this.width);
        // let ty = this.getRenderY(this.interpolate, i) + (this.anchor.y * -this.height);

        let tx = this.getRenderX(this.interpolate, i);
        let ty = this.getRenderY(this.interpolate, i);

        if (this.subPixelAdjust && this.lineWidth % 2)
        {
            tx -= 0.5;
            ty -= 0.5;
        }

        ctx.translate(tx, ty);
        ctx.rotate(this.rotation);

        ctx.beginPath();

    }

    endDraw (ctx) {

        for (let fill of this.fills)
        {
            fill.draw(ctx);
        }

        ctx.restore();

    }

}