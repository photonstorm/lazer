import CopyImageData from 'canvas/imagedata/CopyImageData.js';

//  Weights is an array (Float32 or normal) containing 9 values:
//  [-1, -1, -1,
//   -1, 8,  -1,
//   -1, -1, -1]

export default function Convolve (imageData, weights, opaque = true) {

    let temp = CopyImageData(imageData);

    const side = Math.round(Math.sqrt(weights.length));
    const halfSide = Math.floor(side / 2);

    const src = imageData.data;
    const sw = imageData.width;
    const sh = imageData.height;

    const w = sw;
    const h = sh;

    const dst = temp.data;

    const alphaFac = (opaque) ? 1 : 0;

    for (let y = 0; y < h; y++)
    {
        for (let x = 0; x < w; x++)
        {
            let sy = y;
            let sx = x;

            let index = (y * w + x) * 4;

            let r = 0;
            let g = 0;
            let b = 0;
            let a = 0;

            for (let cy = 0; cy < side; cy++)
            {
                for (let cx = 0; cx < side; cx++)
                {
                    let scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
                    let scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
                    let srcOff = (scy * sw + scx) * 4;
                    let wt = weights[cy * side + cx];
                    r += src[srcOff] * wt;
                    g += src[srcOff + 1] * wt;
                    b += src[srcOff + 2] * wt;
                    a += src[srcOff + 3] * wt;
                }
            }

            imageData.data[index] = r;
            imageData.data[index + 1] = g;
            imageData.data[index + 2] = b;
            imageData.data[index + 3] = a + alphaFac * (255 - a);
        }
    }

}
