import ProcessPixels from '../pixels/Process.js';

/**
* Replaces all pixels matching one color with another. The color values are given as two sets of RGBA values.
* An optional region parameter controls if the replacement happens in just a specific area of the BitmapData or the entire thing. 
*
* @method Phaser.BitmapData#replaceRGB
* @param {number} r1 - The red color value to be replaced. Between 0 and 255.
* @param {number} g1 - The green color value to be replaced. Between 0 and 255.
* @param {number} b1 - The blue color value to be replaced. Between 0 and 255.
* @param {number} a1 - The alpha color value to be replaced. Between 0 and 255.
* @param {number} r2 - The red color value that is the replacement color. Between 0 and 255.
* @param {number} g2 - The green color value that is the replacement color. Between 0 and 255.
* @param {number} b2 - The blue color value that is the replacement color. Between 0 and 255.
* @param {number} a2 - The alpha color value that is the replacement color. Between 0 and 255.
* @return {Phaser.BitmapData} This BitmapData object for method chaining.
*/
export default function ReplaceRGBA (context, r1, g1, b1, a1, r2, g2, b2, a2, x = 0, y = 0, width = 0, height = 0) {

    let effect = function (x, y, r, g, b, a) {

        if (r === r1 && g === g1 && b === b1 && a === a1)
        {
            return [ r2, g2, b2, a2 ];
        }
        else
        {
            return [ r, g, b, a ];
        }

    };

    ProcessPixels(context, effect, x, y, width, height);

}
