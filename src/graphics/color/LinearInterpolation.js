import Linear from 'math/Linear.js';

export function colorWithColor (color1, color2, length = 100, index = 0) {

    return this.RGBwithRGB(color1.r, color1.g, color1.b, color2.r, color2.g, color2.b, length, index);
    
}

export function colorWithRGB (color, r, g, b, length = 100, index = 0) {

    return this.RGBwithRGB(color.r, color.g, color.b, r, g, b, length, index);

}

export function RGBwithRGB (r1, g1, b1, r2, g2, b2, length = 100, index = 0) {

    const t = index / length;

    const r = Linear(r1, r2, t);
    const g = Linear(g1, g2, t);
    const b = Linear(b1, b2, t);

    return { r, g, b };

}
