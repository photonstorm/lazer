import Vec2 from 'math/vector/vec2/Vec2.js';
import GetIndex from 'canvas.GetIndex.js';

//  Set Pixels

let context = null;
let imageData = null;
let tl = null;
let br = null;
let offset = null;

export function load (context, imageData, x = 0, y = 0) {

    this.context = context;
    this.imageData = imageData;

    if (!this.tl)
    {
        this.tl = new Vec2(Infinity, Infinity);
        this.br = new Vec2(0, 0);
        this.offset = new Vec2(x, y);
    }
    else
    {
        this.tl.setTo(Infinity, Infinity);
        this.br.zero();
        this.offset.setTo(x, y);
    }
    
}

export function set (x, y, red = 0, green = 0, blue = 0, alpha = 255) {

    let index = GetIndex(this.imageData, x, y);

    if (img.data[index] >= 0)
    {
        img.data[index] = red;
        img.data[++index] = green;
        img.data[++index] = blue;
        img.data[++index] = alpha;

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

    this.context.putImageData(this.imageData, this.offset.x, this.offset.y, this.tl.x, this.tl.y, this.br.x - this.tl.x, this.br.y - this.tl.y);

}