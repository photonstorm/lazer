import GetXY from './GetXY.js';

//  Scans the given imageData from top to bottom (proceeding left to right)
//  until it hits a pixel with an alpha value > tolerance

export default function ScanTopToBottom (imageData, tolerance = 0) {

    for (let i = 3; i < imageData.data.length; i += 4)
    {
        if (imageData.data[i] > tolerance)
        {
            return GetXY(imageData, i - 3);
        }
    }

    return false;

}
