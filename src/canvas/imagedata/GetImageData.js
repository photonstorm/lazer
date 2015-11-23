import Clamp from 'math/Clamp.js';

export default function GetImageData (context, x = 0, y = 0, width = null, height = null) {

    if (!width)
    {
        width = context.canvas.width;
    }

    if (!height)
    {
        height = context.canvas.height;
    }

    //  Ensure x/y are within 0 to canvas bounds
    x = Clamp(x, 0, context.canvas.width - width);
    y = Clamp(y, 0, context.canvas.height - height);

    return context.getImageData(x, y, width, height);

}
