import Process from 'canvas/pixels/Process.js';

const greyScale = function (x, y, r, g, b, a) {

    let avg = (r + g + b) / 3;

    r = avg;
    g = avg;
    b = avg;

    return [ r, g, b, a ];

};

export default function Grayscale (context, imageData, x = 0, y = 0, width = 0, height = 0) {

    Process(context, this.greyScale, x, y, width, height) {

}
