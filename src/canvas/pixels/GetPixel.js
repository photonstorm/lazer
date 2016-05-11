import GetImageData from '../imagedata/GetImageData.js';

//  Gets a single pixel from the given context and returns
//  an object containing its color properties.
//  If you need to do this a lot (in a heavy loop) then consider using
//  imagedata/GetPixel instead to save on constant temp. image data creation.

export default function GetPixel (context, x, y, out = { r: 0, g: 0, b: 0, a: 0 }) {

    const imageData = GetImageData(context, x, y, 1, 1);

    out.r = imageData.data[0];
    out.g = imageData.data[1];
    out.b = imageData.data[2];
    out.a = imageData.data[3];

    return out;
    
}
