/**
* Converts an RGB color value to HSV (hue, saturation and value).
* Conversion forumla from http://en.wikipedia.org/wiki/HSL_color_space.
* Assumes RGB values are contained in the set [0, 255] and returns h, s and v in the set [0, 1].
* Based on code by Michael Jackson (https://github.com/mjijackson)
*
* @method Lazer.Color.RGBtoHSV
* @static
* @param {number} r - The red color component, in the range 0 - 255.
* @param {number} g - The green color component, in the range 0 - 255.
* @param {number} b - The blue color component, in the range 0 - 255.
* @return {object} An object with the hue, saturation and value set in the h, s and v properties.
*/
export default function RGBtoHSV(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const d = max - min;

    // achromatic by default
    let h = 0;
    const s = (max === 0) ? 0 : d / max;
    const v = max;

    if (max !== min)
    {
        if (max === r)
        {
            h = (g - b) / d + ((g < b) ? 6 : 0);
        }
        else if (max === g)
        {
            h = (b - r) / d + 2;
        }
        else if (max === b)
        {
            h = (r - g) / d + 4;
        }

        h /= 6;
    }

    return { h, s, v };

}
