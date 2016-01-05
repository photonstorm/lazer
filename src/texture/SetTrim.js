/**
* If the frame was trimmed when added to the Texture Atlas this records the trim and source data.
*
* @method SetTrim
* @param {number} width - The actual width of the frame before being trimmed (sourceSize.w)
* @param {number} height - The actual height of the frame before being trimmed (sourceSize.h)
* @param {number} x - The x offset of the trimmed sprite from its x origin (spriteSourceSize.x)
* @param {number} y - The y offset of the trimmed sprite from its y origin (spriteSourceSize.y)
* @param {number} trimWidth - The width of the trimmed frame (spriteSourceSize.w)
* @param {number} trimHeight - The height of the trimmed frame (spriteSourceSize.h)
*/

export default function SetTrim (frame, width, height, x, y, trimWidth, trimHeight) {

    frame.trimmed = true;

    frame.sourceWidth = width;
    frame.sourceHeight = height;

    frame.trimX = x;
    frame.trimY = y;

    frame.trimWidth = trimWidth;
    frame.trimHeight = trimHeight;

    return frame;

}
