//  Set Pixels

let context = null;
let imageData = null;

export function load (context, imageData) {

    this.context = context;
    this.imageData = imageData;
    
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
    }

}

export function write () {

    if (!this.imageData)
    {
        return;
    }

    this.context.putImageData(this.imageData, 0, 0);

}