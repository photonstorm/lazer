import GetIndex from 'canvas/GetIndexFast.js';
import Clamp from 'math/Clamp.js';

export default function ProcessPixels (imageData, callback, x = 0, y = 0, width = 0, height = 0) {

    width = Clamp(width + x, 0, imageData.width);
    height = Clamp(height + y, 0, imageData.height);

    //  Process the pixels
    //  The callback must return an array with
    //  0 = red, 1 = green, 2 = blue, 3 = alpha
    //  where each value is between 0 and 255 inclusive

    for (let ty = y; ty < height; ty++)
    {
        for (let tx = x; tx < width; tx++)
        {
            let index = GetIndex(imageData, tx, ty);

            let color = callback(
                tx, 
                ty, 
                imageData.data[index],
                imageData.data[index + 1],
                imageData.data[index + 2],
                imageData.data[index + 3]
            );

            imageData.data[index] = color[0];
            imageData.data[++index] = color[1];
            imageData.data[++index] = color[2];
            imageData.data[++index] = color[3];
        }
    }

    return imageData;

}