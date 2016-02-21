import Between from 'math/Between.js';
import Vec2 from 'math/vector/vec2/Build.js';

export default class Starfield2D {

    constructor (width, height) {

        this.width = width;
        this.height = height;

        this.speed = Vec2(0, 0);

        this.layers = [];

    }

    addLayer (qty, speedX = 0, speedY = 0) {

        let stars = [];

        for (let i = 0; i < qty; i++)
        {
            let x = Between(0, this.width);
            let y = Between(0, this.height);

            //  Delta values for rendering interpolation
            let dx = x;
            let dy = y;

            stars.push({ x, y, dx, dy });
        }

        let i = this.layers.length;

        this.layers.push( { i, speedX, speedY, stars } );

    }

    update () {

        for (let layer of this.layers)
        {
            for (let star of layer.stars)
            {
                this.wrapX(star, layer.speedX + this.speed[0]);
                this.wrapY(star, layer.speedY + this.speed[1]);
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
            if (x < 0)
            {
                x += this.width;
                star.dx = x;
            }
        }
        else
        {
            //  Going right
            if (x < star.dx)
            {
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
            if (y < 0)
            {
                y += this.height;
                star.dy = y;
            }
        }
        else
        {
            //  Going down
            if (y < star.dy)
            {
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

    get speedX () {

        return this.speed[0];

    }

    get speedY () {

        return this.speed[1];

    }

    set speedX (value) {

        this.speed[0] = value;

    }

    set speedY (value) {

        this.speed[1] = value;

    }

}