import CopyImageData from 'canvas/imagedata/CopyImageData.js';
import BilinearSample from 'canvas/imagedata/BilinearSample.js';

export default function Distort (imageData, amount = 0.5, yAmount = amount) {

    let temp = CopyImageData(imageData);
    let px = new Float32Array(4);

    let w = imageData.width;
    let h = imageData.height;

    for (let y = 0; y < h; y++)
    {
        let sy = -Math.sin( y / (h - 1) * Math.PI * 2);
        let srcY = y + sy * yAmount * h / 4;
        srcY = Math.max(Math.min(srcY, h - 1), 0);

        for (let x = 0; x < w; x++)
        {
            let sx = -Math.sin( x / (w - 1) * Math.PI * 2);
            let srcX = x + sx * amount * w / 4;
            srcX = Math.max(Math.min(srcX, w - 1), 0);

            var rgba = BilinearSample(temp, srcX, srcY, px);

            let index = (y * w + x) * 4;

            imageData.data[index] = rgba[0];
            imageData.data[index + 1] = rgba[1];
            imageData.data[index + 2] = rgba[2];
            imageData.data[index + 3] = rgba[3];
        }
    }

}
