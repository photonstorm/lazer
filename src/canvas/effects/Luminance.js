import ProcessPixels from 'canvas/pixels/Process.js';

export default function Luminance (context, x = 0, y = 0, width = 0, height = 0) {

    let effect = function (x, y, r, g, b, a) {

        // The human eye is bad at seeing red and blue, so we de-emphasize them.
        const avg = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);

        r = avg;
        g = avg;
        b = avg;

        return [ r, g, b, a ];

    };

    ProcessPixels(context, effect, x, y, width, height);

}
