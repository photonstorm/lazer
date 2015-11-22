import ProcessImageData from 'canvas/imagedata/Process.js';
import GetImageData from 'canvas/imagedata/GetImageData.js';
import PutImageData from 'canvas/imagedata/PutImageData.js';

//  Assumes ImageData is taken from 0x0 and written back to 0x0
//  If this isn't the case then use canvas/image/ProcessDirty 
//  and write it back where you need it directly

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

    ProcessImageData(imageData, callback, x, y, width, height);

    PutImageData(context, imageData, 0, 0);

}
