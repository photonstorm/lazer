import HSVtoRGB from './HSVtoRGB.js';

/**
* Get HSV color wheel values in an array which will be 360 elements in size.
*
* @method Phaser.Color.HSVColorWheel
* @static
* @param {number} [s=1] - The saturation, in the range 0 - 1.
* @param {number} [v=1] - The value, in the range 0 - 1.
* @return {array} An array containing 360 elements corresponding to the HSV color wheel.
*/
export default function HSVColorWheel (s = 1, v = 1) {

    let colors = [];

    for (let c = 0; c <= 359; c++)
    {
        colors.push(HSVtoRGB(c / 359, s, v));
    }

    return colors;

}
