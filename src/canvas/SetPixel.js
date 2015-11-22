import GetIndex from 'canvas.GetIndex.js';

//  Writes to the given context immediately.
//  If you wish to perform lots of pixel ops at once then use SetPixels instead.

export default function SetPixel (context, imageData, x, y, red = 0, green = 0, blue = 0, alpha = 255) {

    let index = GetIndex(imageData, x, y);

    if (imageData.data[index] >= 0)
    {
        imageData.data[index] = red;
        imageData.data[++index] = green;
        imageData.data[++index] = blue;
        imageData.data[++index] = alpha;
    }

    context.putImageData(imageData, 0, 0, x, y, 1, 1);
    
}
