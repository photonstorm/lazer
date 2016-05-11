import ProcessPixels from '../pixels/Process.js';

export default function Invert (context, x = 0, y = 0, width = 0, height = 0) {

    let effect = function (x, y, r, g, b, a) {

        r = 255 - r;
        g = 255 - g;
        b = 255 - b;

        return [ r, g, b, a ];

    };

    ProcessPixels(context, effect, x, y, width, height);

}
