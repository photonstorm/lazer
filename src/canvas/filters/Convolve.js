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

        res  = (src[i - w * 4 - 4] || src[i]) * weights[0];
        res += (src[i - w * 4]     || src[i]) * weights[1];
        res += (src[i - w * 4 + 4] || src[i]) * weights[2];
        res += (src[i - 4]         || src[i]) * weights[3];
        res += (src[i]) * weights[4];
        res += (src[i + 4]         || src[i]) * weights[5];
        res += (src[i + w * 4 - 4] || src[i]) * weights[6];
        res += (src[i + w * 4]     || src[i]) * weights[7];
        res += (src[i + w * 4 + 4] || src[i]) * weights[8];

        res /= divisor;
        res += offset;

        dest[i] = Math.min(res, 255);
    }

}
