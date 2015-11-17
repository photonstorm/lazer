import HueToColor from 'graphics/color/HueToColor.js';

export default function (h, s, l) {

    // achromatic by default
    let r = l;
    let g = l;
    let b = l;

    if (s !== 0)
    {
        const q = (l < 0.5) ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = HueToColor(p, q, h + 1 / 3);
        g = HueToColor(p, q, h);
        b = HueToColor(p, q, h - 1 / 3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };

}
