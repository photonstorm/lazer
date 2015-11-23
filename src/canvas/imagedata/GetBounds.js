import TopToBottom from 'canvas/imagedata/ScanTopToBottom.js';
import BottomToTop from 'canvas/imagedata/ScanBottomToTop.js';
import LeftToRight from 'canvas/imagedata/ScanLeftToRight.js';
import RightToLeft from 'canvas/imagedata/ScanRightToLeft.js';

export default function GetBounds (imageData, tolerance, out = { x: 0, y: 0, width: 0, height: 0 }) {

    const top = TopToBottom(imageData, tolerance);

    //  If we hit this, there's no point scanning any more, the image is empty
    if (top[0] === imageData.width || top[1] === imageData.height)
    {
        return out;
    }

    const bottom = BottomToTop(imageData, tolerance);

    //  Now we've got the top and bottom we can work out the left/right using
    //  the heights to save on processing

    const left = LeftToRight(imageData, tolerance, top[1]);
    const right = RightToLeft(imageData, tolerance, top[1]);

    out.x = left[0];
    out.y = top[1];
    out.width = right[0] - left[0];
    out.height = bottom[1] - top[1];

    return out;
    
}