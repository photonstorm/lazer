import Starfield2D from 'fx/starfield/2d/Starfield2D.js';

export default class Starfield2DDot extends Starfield2D {

    constructor (
        width,
        height,
        {
            speedX = 0,
            speedY = 0,
            paddingX = 0,
            paddingY = 0
        } = {})
    {

        super(width, height, { speedX, speedY, paddingX, paddingY });

    }

    addLayer (qty, speedX = 0, speedY = 0, color = '#fff') {

        return super.addLayer(qty, speedX, speedY, { color });

    }

    render (i, ctx) {

        for (let layer of this.layers)
        {
            ctx.fillStyle = layer.color;
            
            for (let star of layer.stars)
            {
                let x = star.dx + (star.x - star.dx) * i;
                let y = star.dy + (star.y - star.dy) * i;
                ctx.fillRect(x, y, this.starWidth, this.starHeigt);
            }
        }

    }

}