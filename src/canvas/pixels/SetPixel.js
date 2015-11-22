import SetPixel from 'canvas/imagedata/SetPixel.js';

//  Writes to the given context immediately.
//  If you wish to perform lots of pixel ops at once then use SetPixels instead.
//  If you wish to just write to the imageData use imagedata/SetPixel instead.

export default function SetPixel (context, imageData, x, y, red = 0, green = 0, blue = 0, alpha = 255) {

    if (SetPixel(imageData, x, y, red, green, blue, alpha))
    {
        context.putImageData(imageData, 0, 0, x, y, 1, 1);
    }

    return context;
    
}
