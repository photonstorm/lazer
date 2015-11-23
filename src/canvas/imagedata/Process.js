import GetX from 'canvas/imagedata/GetX.js';
import GetY from 'canvas/imagedata/GetY.js';

//  This will process ALL pixels in the ImageData
//  If you only wish to process a few then use GetImageData to extract the region needed.

export default function Process (imageData, callback) {

    //  Process the pixels
    //  The callback must return an array with
    //  0 = red, 1 = green, 2 = blue, 3 = alpha
    //  where each value is between 0 and 255 inclusive

    for (let i = 0; i < imageData.data.length; i += 4)
    {
        let color = callback(
            GetX(imageData, i), 
            GetY(imageData, i), 
            imageData.data[i],
            imageData.data[i + 1],
            imageData.data[i + 2],
            imageData.data[i + 3]
        );

        imageData.data[i] = color[0];
        imageData.data[i + 1] = color[1];
        imageData.data[i + 2] = color[2];
        imageData.data[i + 3] = color[3];
    }

    return imageData;

}
