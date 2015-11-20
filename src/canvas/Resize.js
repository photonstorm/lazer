
export default function (canvas, width, height = width) {

    width = Math.abs(width);
    height = Math.abs(height);

    if (canvas.width !== width)
    {
        canvas.width = width;
    }

    if (canvas.height !== height)
    {
        canvas.height = height;
    }

    return canvas;
    
}
