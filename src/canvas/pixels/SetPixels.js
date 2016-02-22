import Vec2 from 'math/vector/vec2/Vec2.js';
import SetPixel from 'canvas/imagedata/SetPixel.js';
import PutImageData from 'canvas/imagedata/PutImageData.js';

//  Set Pixels

let context = null;
let imageData = null;
let tl = null;
let br = null;
let offset = null;

export function load (context, imageData, offsetX = 0, offsetY = 0) {

    this.context = context;
    this.imageData = imageData;

    if (!this.tl)
    {
        this.tl = new Vec2(Infinity, Infinity);
        this.br = new Vec2(0, 0);
        this.offset = new Vec2(offsetX, offsetY);
    }
    else
    {
        this.tl.setTo(Infinity, Infinity);
        this.br.zero();
        this.offset.setTo(offsetX, offsetY);
    }

}

export function set (x, y, red = 0, green = 0, blue = 0, alpha = 255) {

    if (SetPixel(this.imageData, x, y, red, green, blue, alpha))
    {
        //  If the pixel was written correctly then let's extend our bounds area

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

    return PutImageData(
        this.context, 
        this.imageData, 
        this.offset.x, 
        this.offset.y, 
        this.tl.x,
        this.tl.y,
        this.br.x - this.tl.x,
        this.br.y - this.tl.y
    );

}