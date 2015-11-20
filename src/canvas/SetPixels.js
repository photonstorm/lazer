import Vec2 from 'math/vector/vec2/Vec2.js';

//  Set Pixels

let context = null;
let imageData = null;
let tl = null;
let br = null;

export function load (context, imageData) {

    this.context = context;
    this.imageData = imageData;

    if (!this.tl)
    {
        this.tl = new Vec2(Infinity, Infinity);
        this.br = new Vec2(0, 0);
    }
    
}

export function set (x, y, red = 0, green = 0, blue = 0, alpha = 255) {

    if (!this.imageData)
    {
        return;
    }

    const img = this.imageData;

    x = Math.abs(Math.round(x));
    y = Math.abs(Math.round(y));

    if (x <= img.width && y <= img.height)
    {
        let index = ~~(x + (y * img.width));

        index *= 4;

        if (img.data[index] >= 0)
        {
            img.data[index] = red;
            img.data[++index] = green;
            img.data[++index] = blue;
            img.data[++index] = alpha;
        }

        if (x < this.tl.x)
        {
            this.tl.x = x;
        }

        if (y < this.tl.y)
        {
            this.tl.y = y;
        }

        if (x > this.br.x)
        {
            this.br.x = x;
        }

        if (y > this.br.y)
        {
            this.br.y = y;
        }
    }

}

export function write () {

    if (!this.imageData)
    {
        return;
    }

    this.context.putImageData(this.imageData, 0, 0, this.tl.x, this.tl.y, this.br.x - this.tl.x, this.br.y - this.tl.y);

}