import { PALETTE_ARNE } from './palettes/Arne16.js';
import Canvas from '../canvas/Canvas.js';
import GetContext from '../canvas/GetContext.js';
import Resize from '../canvas/Resize.js';

//  data = Pixel Data Array
//  canvas = either a Canvas object, or null / undefined / false
//  palette = Create Palette Array

export default function RenderToCanvas (
        data, 
        { 
            canvas = undefined,
            palette = PALETTE_ARNE,
            pixelWidth = 8,
            pixelHeight = pixelWidth,
            resizeCanvas = true,
            clear = true,
            preRender = undefined,
            postRender = undefined
        } = {}
    ) {

    let width = data[0].length * pixelWidth;
    let height = data.length * pixelHeight;

    if (!canvas)
    {
        canvas = Canvas(width, height);
        resizeCanvas = false;
        clear = false;
    }

    let ctx = GetContext(canvas);

    if (resizeCanvas)
    {
        Resize(canvas, width, height);
    }

    if (clear)
    {
        ctx.clearRect(0, 0, width, height);
    }

    //  preRender Callback?
    if (preRender)
    {
        preRender(canvas, ctx);
    }

    let x = 0;
    let y = 0;

    for (let row of data)
    {
        x = 0;

        for (let pixel of row)
        {
            let idx = parseInt(pixel, 16);

            if (palette[idx])
            {
                ctx.fillStyle = palette[idx];
                ctx.fillRect(x, y, pixelWidth, pixelHeight);
            }

            x += pixelWidth;
        }

        y += pixelHeight;
    }

    //  postRender Callback?
    if (postRender)
    {
        postRender(canvas, ctx);
    }

    return canvas;

}