import GetIndex from 'canvas/imagedata/GetIndex.js';

//  Writes a single value to the given imageData.

export default function SetPixel (imageData, x, y, red = 0, green = 0, blue = 0, alpha = 255) {

    let index = GetIndex(imageData, x, y);

    if (imageData.data[index] >= 0)
    {
        imageData.data[index] = red;
        imageData.data[++index] = green;
        imageData.data[++index] = blue;
        imageData.data[++index] = alpha;

        return true;
    }

    return false;
    
}
