import TopToBottom from 'canvas/imagedata/ScanTopToBottom.js';
import BottomToTop from 'canvas/imagedata/ScanBottomToTop.js';
import LeftToRight from 'canvas/imagedata/ScanLeftToRight.js';
import RightToLeft from 'canvas/imagedata/ScanRightToLeft.js';

/**
* Scans the BitmapData, pixel by pixel, until it encounters a pixel that isn't transparent (i.e. has an alpha value > 0).
* It then stops scanning and returns an object containing the color of the pixel in r, g and b properties and the location in the x and y properties.
* 
* The direction parameter controls from which direction it should start the scan:
* 
* 0 = top to bottom
* 1 = bottom to top
* 2 = left to right
* 3 = right to left
*
* @method Phaser.BitmapData#getFirstPixel
* @param {number} [direction=0] - The direction in which to scan for the first pixel. 0 = top to bottom, 1 = bottom to top, 2 = left to right and 3 = right to left.
* @param {integer} [tolerance=0] - The alpha value must be greater than this to be considered non-alpha (between 0 and 255)
* @return {object} Returns an object containing the color of the pixel in the `r`, `g` and `b` properties and the location in the `x` and `y` properties.
*/
export default function GetFirstPixel (imageData, direction = 0, tolerance = 0) {

    if (direction === 0)
    {
        return TopToBottom(imageData, tolerance);
    }
    else if (direction === 1)
    {
        return BottomToTop(imageData, tolerance);
    }
    else if (direction === 2)
    {
        return LeftToRight(imageData, tolerance);
    }
    else if (direction === 3)
    {
        return RightToLeft(imageData, tolerance);
    }
    
}
