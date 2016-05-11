import GetX from './GetX.js';
import GetY from './GetY.js';

//  Based on the given index return the X and Y components

export default function GetXY (imageData, index) {

    return [ GetX(imageData, index), GetY(imageData, index) ];

}
