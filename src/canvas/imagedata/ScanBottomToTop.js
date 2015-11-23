import GetXY from 'canvas/imagedata/GetXY.js';

//  Scans the given imageData from bottom to top (proceeding right to left)
//  until it hits a pixel with an alpha value > tolerance

export default function ScanBottomToTop (imageData, tolerance = 0) {

    for (let i = imageData.data.length; i > 0; i -= 4)
    {
        if (imageData.data[i] > tolerance)
        {
            return GetXY(imageData, i - 3);
        }
    }

    return false;

}
