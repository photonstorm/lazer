import Clamp from 'math/Clamp.js';

//  method 1
// let p = LinearGradient(this.ctx, 0, 0, 256, 256);
// p.addColorStop(0, '#ff0000');
// p.addColorStop(0.5, '#ffff00');
// p.addColorStop(1, '#00ff00');

//  method 2
// let p = LinearGradient(this.ctx, 0, 0, 256, 256, 0, '#ff0000', 0.5, '#00ff00', 1, '#0000ff');

//  method 3
// let p = LinearGradient(this.ctx, 0, 0, 256, 256, [ 0, '#ff00f0', 0.5, '#05fff0', 1, '#8000ff' ]);

export default function LinearGradient (context, x0, y0, x1, y1, ...colors) {

    let gradient = context.createLinearGradient(x0, y0, x1, y1);

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
