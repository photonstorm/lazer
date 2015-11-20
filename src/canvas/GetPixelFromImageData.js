/**
 * [description]
 * @param  {ImageData} imageData [description]
 * @param  {integer} x         [description]
 * @param  {integer} y         [description]
 * @param  {Object} out       [description]
 * @return {Object}           [description]
 */
export default function GetPixelFromImageData (imageData, x, y, out = { r: 0, g: 0, b: 0, a: 0 }) {

    x = Math.abs(Math.round(x));
    y = Math.abs(Math.round(y));

    let index = ~~(x + (y * imageData.width));

    index *= 4;

    if (imageData.data[index] >= 0)
    {
        out.r = imageData.data[index];
        out.g = imageData.data[++index];
        out.b = imageData.data[++index];
        out.a = imageData.data[++index];
    }

    return out;
    
}
