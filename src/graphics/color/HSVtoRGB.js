/**
 * Converts an HSV (hue, saturation and value) color value to RGB.
 * Conversion formula from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes HSV values are contained in the set [0, 1] and returns r, g and b values in the set [0, 255].
 * Based on code by Michael Jackson (https://github.com/mjijackson)
 *
 * @method fromHSV
 * @param {number} h - The hue, in the range 0 - 1.
 * @param {number} s - The saturation, in the range 0 - 1.
 * @param {number} v - The value, in the range 0 - 1.
 * @return {BaseColor} This
 */
export default function HSVtoRGB (h, s = 1, v = 1) {

    const i = Math.floor(h * 6);
    const f = h * 6 - i;

    const p = Math.floor((v * (1 - s)) * 255);
    const q = Math.floor((v * (1 - f * s)) * 255);
    const t = Math.floor((v * (1 - (1 - f) * s)) * 255);

    v = Math.floor(v *= 255);

    const r = i % 6;

    if (r === 0)
    {
        return { r: v, g: t, b: p };
    }
    else if (r === 1)
    {
        return { r: q, g: v, b: p };
    }
    else if (r === 2)
    {
        return { r: p, g: v, b: t };
    }
    else if (r === 3)
    {
        return { r: p, g: q, b: v };
    }
    else if (r === 4)
    {
        return { r: t, g: p, b: v };
    }
    else if (r === 5)
    {
        return { r: v, g: p, b: q };
    }
    
}