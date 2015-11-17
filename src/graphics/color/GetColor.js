/**
 * Given 3 color values this will return an integer representation of it.
 *
 * @method getColor
 * @param {integer} r - The red color component in the range 0 - 255.
 * @param {integer} g - The green color component in the range 0 - 255.
 * @param {integer} b - The blue color component in the range 0 - 255.
 * @return {integer} A native color value integer (format: 0xRRGGBB).
 */
export default function (r, g, b) {

    return r << 16 | g << 8 | b;

}
