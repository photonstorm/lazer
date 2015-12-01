import Clamp from 'math/Clamp.js';

// x0 - The x axis of the coordinate of the start circle.
// y0 - The y axis of the coordinate of the start circle.
// r0 - The radius of the start circle.
// x1 - The x axis of the coordinate of the end circle.
// y1 - The y axis of the coordinate of the end circle.
// r1 - The radius of the end circle.

export default function RadialGradient (context, x0, y0, r0, x1, y1, r1, ...colors) {

    let gradient = context.createRadialGradient(x0, y0, r0, x1, y1, r1);

    if (colors.length > 0)
    {
        if (Array.isArray(colors[0]))
        {
            colors = colors[0];
        }

        for (let i = 0; i < colors.length / 2; i += 2)
        {
            gradient.addColorStop(colors[i], colors[i + 1]);
        }
    }

    return gradient;
    
}

export function addColor (gradient, offset, color) {

    gradient.addColorStop(Clamp(offset, 0, 1), color);

    return gradient;

}
