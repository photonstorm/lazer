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

    x = Clamp(x, 0, width);
    y = Clamp(y, 0, height);

    return context.getImageData(x, y, width, height);

}
