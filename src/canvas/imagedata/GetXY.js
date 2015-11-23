import GetX from 'canvas/imagedata/GetX.js';
import GetY from 'canvas/imagedata/GetY.js';

//  Based on the given index return the X and Y components

export default function GetXY (imageData, index) {

    return [ GetX(imageData, index), GetY(imageData, index) ];

}
