import CopyImageData from 'canvas/imagedata/CopyImageData.js';

//  Weights is an array (Float32 or normal) containing 9 values:
//  [-1, -1, -1,
//   -1, 8,  -1,
//   -1, -1, -1]

export default function Convolve (imageData, weights, divisor = false, offset = 0) {

    //  Copy the ImageData
    let temp = CopyImageData(imageData);

    if (!divisor)
    {
        divisor = weights.reduce(function(a, b) { return a + b; }) || 1;
    }

    const src = temp.data;
    const dest = imageData.data;
    const w = imageData.width;

    let res = 0;

    for (let i = 0; i < src.length; i++)
    {
        if ((i + 1) % 4 === 0)
        {
            dest[i] = src[i];
            continue;
        }

        res = 0;

        let pixels = [
            src[i - w * 4 - 4] || src[i],
            src[i - w * 4]     || src[i],
            src[i - w * 4 + 4] || src[i],
            src[i - 4]         || src[i],
            src[i],
            src[i + 4]         || src[i],
            src[i + w * 4 - 4] || src[i],
            src[i + w * 4]     || src[i],
            src[i + w * 4 + 4] || src[i]
        ];

        for (let j = 0; j < 9; j++)
        {
            res += pixels[j] * weights[j];
        }

        res /= divisor;
        res += offset;

        dest[i] = res;
    }

}
