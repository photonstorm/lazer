import SetPixelData from '../imagedata/SetPixel.js';
import GetImageData from '../imagedata/GetImageData.js';
import PutImageData from '../imagedata/PutImageData.js';

//  Writes to the given context immediately.
//  If you wish to perform lots of pixel ops at once then use SetPixels instead.
//  If you wish to just write to the imageData use imagedata/SetPixel instead.

export default function SetPixel (context, x, y, red = 0, green = 0, blue = 0, alpha = 255) {

    const imageData = GetImageData(context, x, y, 1, 1);

    if (SetPixelData(imageData, 0, 0, red, green, blue, alpha))
    {
        PutImageData(context, imageData, x, y);
    }

    return context;
    
}
