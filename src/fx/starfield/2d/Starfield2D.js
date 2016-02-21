import Between from 'math/Between.js';
import Vec2 from 'math/vector/vec2/Build.js';

export default class Starfield2D {

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

        this.width = width;
        this.height = height;

        this.speedX = speedX;
        this.speedY = speedY;

        this.paddingX = paddingX;
        this.paddingY = paddingY;

        this.layers = [];

    }

    addLayer (qty, speedX = 0, speedY = 0) {

        let stars = [];

        for (let i = 0; i < qty; i++)
        {
            let x = Between(-this.paddingX, (this.width + this.paddingX));
            let y = Between(-this.paddingY, (this.height + this.paddingY));

            //  Delta values for rendering interpolation
            let dx = x;
            let dy = y;

            stars.push({ x, y, dx, dy });
        }

        let i = this.layers.length;

        let layer = { i, speedX, speedY, stars };

        this.layers.push(layer);

        return layer;

    }

    update () {

        for (let layer of this.layers)
        {
            for (let star of layer.stars)
            {
                this.wrapX(star, layer.speedX + this.speedX);
                this.wrapY(star, layer.speedY + this.speedY);
            }
        }

    }

    wrapX (star, speed) {

        if (speed === 0)
        {
            return;
        }

        star.dx = star.x;

        let x = (star.x + speed) % this.width;

        if (speed < 0)
        {
            //  Going left
            if (x < -this.paddingX)
            {
                x += (this.width + this.paddingX);
                star.dx = x;
            }
        }
        else
        {
            //  Going right
            if (x < star.dx)
            {
                x -= this.paddingX;
                star.dx = x;
            }
        }

        star.x = x;

    }

    wrapY (star, speed) {

        if (speed === 0)
        {
            return;
        }

        star.dy = star.y;

        let y = (star.y + speed) % this.height;

        if (speed < 0)
        {
            //  Going up
            if (y < -this.paddingY)
            {
                y += (this.height + this.paddingY);
                star.dy = y;
            }
        }
        else
        {
            //  Going down
            if (y < star.dy)
            {
                y -= this.paddingY;
                star.dy = y;
            }
        }

        star.y = y;

    }

    render (i = 0, renderCallback) {

        for (let layer of this.layers)
        {
            for (let star of layer.stars)
            {
                let x = star.dx + (star.x - star.dx) * i;
                let y = star.dy + (star.y - star.dy) * i;
                renderCallback(layer.i, x, y);
            }
        }

    }

    destroy () {

        for (let layer of this.layers)
        {
            layer.stars = [];
        }

        this.layers = [];

    }

}