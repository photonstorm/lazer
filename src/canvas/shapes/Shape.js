import DegToRad from 'math/DegToRad.js';
import RadToDeg from 'math/RadToDeg.js';
import Wrap from 'math/Wrap.js';
import ShapeFill from 'canvas/shapes/ShapeFill.js';
import ShapeStroke from 'canvas/shapes/ShapeStroke.js';

export default function Shape (
                                {
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
                                    anchor = undefined,
                                    anchorX = 0,
                                    anchorY = 0,
                                    scale = undefined,
                                    scaleX = 1,
                                    scaleY = 1,
                                    lineWidth = 1,
                                    lineCap = 'butt',
                                    lineJoin = 'bevel',
                                    miterLimit = 10,
                                    lineDashSegments = undefined,
                                    lineDashOffset = 0,
                                    interpolate = true,
                                    subPixelAdjust = true,
                                    visible = true
                                } = {}) {

    let shape = {

        visible: visible,

        rotationAnchorX: anchorX,
        rotationAnchorY: anchorY,

        scaleX: scaleX,
        scaleY: scaleY,

        width: width,
        height: height,

        //  Arc / Circle specific
        radius: radius,
        startAngle: startAngle,
        endAngle: endAngle,
        antiClockwise: antiClockwise,

        rotation: rotation,

        lineWidth: lineWidth,
        lineCap: lineCap,
        lineJoin: lineJoin,
        miterLimit: miterLimit,

        lineDashSegments: lineDashSegments,
        lineDashOffset: lineDashOffset,

        interpolate: interpolate,
        subPixelAdjust: subPixelAdjust,

        fills: [],

        addFill () {

            let fill = new ShapeFill(this);

            this.fills.push(fill);

            return fill;

        },

        addStroke () {

            let stroke = new ShapeStroke(this);

            this.fills.push(stroke);

            return stroke;

        },

        getFill (index = 0) {

            return this.fills[index];

        },

        lineDash (segments, offset = 0) {

            this.lineDashSegments = segments;
            this.lineDashOffset = offset;

        },

        set angle (value) {

            this.rotation = DegToRad(Wrap(value, 0, 360));

        },

        get angle () {

            return RadToDeg(this.rotation);

        },

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

            // let tx = this.getRenderX(this.interpolate, i);
            // let ty = this.getRenderY(this.interpolate, i);

            // if (this.subPixelAdjust && this.lineWidth % 2)
            // {
            //     tx -= 0.5;
            //     ty -= 0.5;
            // }

            this.transform.setTransform(ctx);

            ctx.beginPath();

        },

        endDraw (ctx) {

            for (let fill of this.fills)
            {
                fill.draw(ctx);
            }

            ctx.restore();

        }

    };

    if (anchor !== undefined)
    {
        shape.rotationAnchorX = anchor;
        shape.rotationAnchorY = anchor;
    }

    if (scale !== undefined)
    {
        shape.scaleX = scale;
        shape.scaleY = scale;
    }

    if (radius !== 0)
    {
        shape.width = radius * 2;
        shape.height = radius * 2;
    }

    //  degs
    if (angle !== 0)
    {
        shape.angle = angle;
    }

    if (strokeFirst)
    {
        if (stroke !== '')
        {
            let strokeFill = shape.addStroke();
            strokeFill.setSolid(stroke);
        }

        if (fill !== '')
        {
            let shapeFill = shape.addFill();
            shapeFill.setSolid(fill);
        }
    }
    else
    {
        if (fill !== '')
        {
            let shapeFill = shape.addFill();
            shapeFill.setSolid(fill);
        }

        if (stroke !== '')
        {
            let strokeFill = shape.addStroke();
            strokeFill.setSolid(stroke);
        }
    }

    return shape;

}
