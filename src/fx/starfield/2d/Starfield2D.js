import Between from 'math/Between.js';

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

    makeStarsArray (qty) {

        let stars = [];

        if (typeof(qty) === 'function')
        {
            //  User defined function
            let x = -this.paddingX;
            let y = -this.paddingY;
            let width = this.width + this.paddingX;
            let height = this.height + this.paddingY;

            stars = qty(x, y, width, height);

            //  Add the dx/dy values
            for (let star of stars)
            {
                if (star.dx === undefined)
                {
                    star.dx = star.x;
                }

                if (star.dy === undefined)
                {
                    star.dy = star.y;
                }
            }
        }
        else
        {
            //  Random spread of stars

            for (let i = 0; i < qty; i++)
            {
                let x = Between(-this.paddingX, (this.width + this.paddingX));
                let y = Between(-this.paddingY, (this.height + this.paddingY));

                //  Delta values for rendering interpolation
                let dx = x;
                let dy = y;

                stars.push({ x, y, dx, dy });
            }
        }

        return stars;

    }

    addWaveLayer (
        qty,
        speedX = 0,
        speedY = 0,
        {
            sinX = 0,
            sinY = 0,
            cosX = 0,
            cosY = 0,
            sinAmpX = 1,
            sinAmpY = 1,
            cosAmpX = 1,
            cosAmpY = 1
        } = {})
    {

        let stars = this.makeStarsArray(qty);

        let i = this.layers.length;

        //  3 values per axis (internal counter + amplitude + frequency)

        //  Frequency Values (per axis) = sinX, sinY, cosX and cosY
        //  Amplitude Values (per axis) = sinAmpX, sinAmpY, cosAmpX, cosAmpY

        //  Internal counters (two per axis)
        let _sinX = 0;
        let _sinY = 0;
        let _cosX = 0;
        let _cosY = 0;

        let layer = {
            i,
            speedX,
            speedY,
            stars,
            wave: true,
            _sinX,
            _sinY,
            _cosX,
            _cosY,
            sinX,
            sinY,
            cosX,
            cosY,
            sinAmpX,
            sinAmpY,
            cosAmpX,
            cosAmpY
        };

        this.layers.push(layer);

        return layer;

    }

    addLayer (qty, speedX = 0, speedY = 0) {

        let stars = this.makeStarsArray(qty);

        let i = this.layers.length;

        let layer = { i, speedX, speedY, stars, wave: false };

        this.layers.push(layer);

        return layer;

    }

    update () {

        for (let layer of this.layers)
        {
            if (layer.wave)
            {
                this.updateWaveLayer(layer);
            }

            for (let star of layer.stars)
            {
                this.wrapX(star, layer.speedX + this.speedX);
                this.wrapY(star, layer.speedY + this.speedY);
            }
        }

    }

    updateWaveLayer (layer) {

        //  X axis

        if (layer.sinX !== 0)
        {
            layer.speedX = Math.sin(layer._sinX += layer.sinX) * layer.sinAmpX;

            if (layer._sinX > 360)
            {
                layer._sinX = layer._sinX % 360;
            }
        }
        else if (layer.cosX !== 0)
        {
            layer.speedX = Math.cos(layer._cosX += layer.cosX) * layer.cosAmpX;

            if (layer._cosX > 360)
            {
                layer._cosX = layer._cosX % 360;
            }
        }

        //  Y axis

        if (layer.sinY !== 0)
        {
            layer.speedY = Math.sin(layer._sinY += layer.sinY) * layer.sinAmpY;

            if (layer._sinY > 360)
            {
                layer._sinY = layer._sinY % 360;
            }
        }
        else if (layer.cosY !== 0)
        {
            layer.speedY = Math.cos(layer._cosY += layer.cosY) * layer.cosAmpY;

            if (layer._cosY > 360)
            {
                layer._cosY = layer._cosY % 360;
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