import ProcessImageData from '../imagedata/Process.js';
import GetImageData from '../imagedata/GetImageData.js';
import PutImageData from '../imagedata/PutImageData.js';

export default function Process (context, callback, x = 0, y = 0, width = null, height = null) {

    if (!width)
    {
        width = context.canvas.width;
    }

    if (!height)
    {
        height = context.canvas.height;
    }

    let imageData = GetImageData(context, x, y, width, height);

    ProcessImageData(imageData, callback);

    PutImageData(context, imageData, x, y);

}
