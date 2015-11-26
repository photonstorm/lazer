import GetIndex from 'canvas/imagedata/GetIndex.js';

export default function GetPixels3x3 (imageData, x, y, out = []) {

    //  Where x/y is the middle pixel and this returns
    //  an array containing the 8 pixels around the middle pixel

    let index = GetIndex(imageData, x, y);

    if (index === -1)
    {
        return out;
    }

    //  Our source pixel
    let r = imageData.data[index];
    let g = imageData.data[index + 1];
    let b = imageData.data[index + 2];
    let a = imageData.data[index + 3];

    let w = Math.max(0, x - 1);
    let h = Math.max(0, y - 1);
    let mw = Math.min(imageData.width, w + 2);
    let mh = Math.min(imageData.height, h + 2);
    let i = 0;

    for (let ty = h; ty <= mh; ty++)
    {
        for (let tx = w; tx <= mw; tx++)
        {
            let index = GetIndex(imageData, tx, ty);

            //  Edge pixel? Use source values
            if (index === -1)
            {
                out[i++] = r;
                out[i++] = g;
                out[i++] = b;
                out[i++] = a;
            }
            else
            {
                out[i++] = imageData.data[index];
                out[i++] = imageData.data[index + 1];
                out[i++] = imageData.data[index + 2];
                out[i++] = imageData.data[index + 3];
            }
        }
    }

    return out;
    
}
