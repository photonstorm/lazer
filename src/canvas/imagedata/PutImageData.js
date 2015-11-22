
export default function PutImageData (context, imageData, x = 0, y = 0, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {

    if (dirtyX !== undefined)
    {
        context.putImageData(imageData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
    }
    else
    {
        context.putImageData(imageData, x, y);
    }

    return context;

}
