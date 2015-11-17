import ComponentToHex from 'graphics/color/ComponentToHex.js';

export default function (r, g, b, a = 255, prefix = '#') {

    if (prefix === '#')
    {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    else
    {
        return '0x' + ComponentToHex(a) + ComponentToHex(r) + ComponentToHex(g) + ComponentToHex(b);
    }

}
