/**
 * Given an alpha and 3 color values this will return an integer representation of it.
 *
 * @method getColor32
 * @param {integer} r - The red color component in the range 0 - 255.
 * @param {integer} g - The green color component in the range 0 - 255.
 * @param {integer} b - The blue color component in the range 0 - 255.
 * @param {integer} a - The alpha color component in the range 0 - 255.
 * @return {integer} A native color value integer (format: 0xAARRGGBB).
 */
export default function (r, g, b, a) {

    return a << 24 | r << 16 | g << 8 | b;

}
