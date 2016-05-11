import ProcessPixels from '../pixels/Process.js';

export default function Brightness (amount, context, x = 0, y = 0, width = 0, height = 0) {

    let effect = function (x, y, r, g, b, a) {

        r += amount;
        g += amount;
        b += amount;

        return [ r, g, b, a ];

    };

    ProcessPixels(context, effect, x, y, width, height);

}
