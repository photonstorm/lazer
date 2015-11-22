import Process from 'canvas/imagedata/Process.js';
import PutImageData from 'canvas/imagedata/PutImageData.js';

//  Assumes ImageData is taken from 0x0 and written back to 0x0
//  If this isn't the case then use canvas/image/ProcessDirty 
//  and write it back where you need it directly

export default function ProcessPixels (context, imageData, callback, x = 0, y = 0, width = 0, height = 0) {

    Process(imageData, callback, x, y, width, height);

    PutImageData(context, imageData, 0, 0);

}
