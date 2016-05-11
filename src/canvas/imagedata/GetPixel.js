import GetIndex from './GetIndex.js';

/**
 * [description]
 * @param  {ImageData} imageData [description]
 * @param  {integer} x         [description]
 * @param  {integer} y         [description]
 * @param  {Object} out       [description]
 * @return {Object}           [description]
 */
export default function GetPixel (imageData, x, y, out = { r: 0, g: 0, b: 0, a: 0 }) {

    let index = GetIndex(imageData, x, y);

    if (imageData.data[index] >= 0)
    {
        out.r = imageData.data[index];
        out.g = imageData.data[++index];
        out.b = imageData.data[++index];
        out.a = imageData.data[++index];
    }

    return out;
    
}
