//  Writes to the given context immediately.
//  If you wish to perform lots of pixel ops at once then use SetPixels instead.

export default function SetPixel (context, imageData, x, y, red = 0, green = 0, blue = 0, alpha = 255) {

    x = Math.abs(Math.round(x));
    y = Math.abs(Math.round(y));

    if (x <= imageData.width && y <= imageData.height)
    {
        let index = ~~(x + (y * imageData.width));

        index *= 4;

        if (imageData.data[index] >= 0)
        {
            imageData.data[index] = red;
            imageData.data[++index] = green;
            imageData.data[++index] = blue;
            imageData.data[++index] = alpha;
        }
    }

    context.putImageData(imageData, 0, 0);
    
}
