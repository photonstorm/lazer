import GetIndex from 'canvas/imagedata/GetIndex.js';

//  Scans the given imageData from left to right
//  until it hits a pixel with an alpha value > tolerance

export default function ScanLeftToRight (imageData, tolerance = 0, startY = 0) {

    let x1 = imageData.width;
    let y1 = imageData.height;

    for (let y = startY; y < imageData.height; y++)
    {
        for (let x = 0; x < imageData.width; x++)
        {
            if (x < x1 && imageData.data[GetIndex(imageData, x, y)] > tolerance)
            {
                x1 = x;
                y1 = y;
            }
        }
    }

    return [ x1, y1 ];

}
