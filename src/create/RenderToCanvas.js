import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';

//  data = Pixel Data Array
//  canvas = either a Canvas object, or null / undefined / false
//  palette = Create Palette Array

export default function RenderToCanvas (data, canvas, palette, pixelWidth = 8, pixelHeight = 8) {

    if (!canvas)
    {
        let w = data[0].length * pixelWidth;
        let h = data.length * pixelHeight;
        canvas = Canvas(w, h);
    }

    let ctx = GetContext(canvas);

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

    return canvas;

}