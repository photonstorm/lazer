
export default function GetImageData (context, x = 0, y = 0, width = null, height = null) {

    x = Math.abs(Math.round(x));
    y = Math.abs(Math.round(y));

    if (!width)
    {
        width = context.canvas.width;
    }

    if (!height)
    {
        height = context.canvas.height;
    }

    return context.getImageData(x, y, width, height);

}
