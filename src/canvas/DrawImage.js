/**
 * Copies a rectangular area from the source object to this BitmapData. If you give `null` as the source it will copy from itself.
 * You can optionally resize, translate, rotate, scale, alpha or blend as it's drawn.
 * All rotation, scaling and drawing takes place around the regions center point by default, but can be changed with the anchor parameters.
 * Note that the source image can also be this BitmapData, which can create some interesting effects.
 * 
 * This method has a lot of parameters for maximum control.
 * You can use the more friendly methods like `copyRect` and `draw` to avoid having to remember them all.
 *
 * @method Phaser.BitmapData#copy
 * @param {Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|HTMLCanvasElement|string} [source] - The source to copy from. If you give a string it will try and find the Image in the Game.Cache first. This is quite expensive so try to provide the image itself.
 * @param {number} [x=0] - The x coordinate representing the top-left of the region to copy from the source image.
 * @param {number} [y=0] - The y coordinate representing the top-left of the region to copy from the source image.
 * @param {number} [width] - The width of the region to copy from the source image. If not specified it will use the full source image width.
 * @param {number} [height] - The height of the region to copy from the source image. If not specified it will use the full source image height.
 * @param {number} [tx] - The x coordinate to translate to before drawing. If not specified it will default to the `x` parameter. If `null` and `source` is a Display Object, it will default to `source.x`.
 * @param {number} [ty] - The y coordinate to translate to before drawing. If not specified it will default to the `y` parameter. If `null` and `source` is a Display Object, it will default to `source.y`.
 * @param {number} [newWidth] - The new width of the block being copied. If not specified it will default to the `width` parameter.
 * @param {number} [newHeight] - The new height of the block being copied. If not specified it will default to the `height` parameter.
 * @param {number} [rotate=0] - The angle in radians to rotate the block to before drawing. Rotation takes place around the center by default, but can be changed with the `anchor` parameters.
 * @param {number} [anchorX=0] - The anchor point around which the block is rotated and scaled. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
 * @param {number} [anchorY=0] - The anchor point around which the block is rotated and scaled. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
 * @param {number} [scaleX=1] - The horizontal scale factor of the block. A value of 1 means no scaling. 2 would be twice the size, and so on.
 * @param {number} [scaleY=1] - The vertical scale factor of the block. A value of 1 means no scaling. 2 would be twice the size, and so on.
 * @param {number} [alpha=1] - The alpha that will be set on the context before drawing. A value between 0 (fully transparent) and 1, opaque.
 * @param {string} [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
 * @param {boolean} [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
 * @return {Phaser.BitmapData} This BitmapData object for method chaining.
 */

export default function DrawImage (
    context, 
    image, 
    {
        srcX = 0,
        srcY = 0,
        srcWidth = image.width,
        srcHeight = image.height,
        x = x,
        y = y,
        width = srcWidth,
        height = srcHeight,
        rotate = 0,
        anchorX = 0,
        anchorY = 0,
        scaleX = 1,
        scaleY = 1,
        alpha = 1,
        blendMode = null,
        roundPx = false
    } = {})
{

    if (alpha === 0 || scaleX === 0 || scaleY === 0)
    {
        //  Why bother wasting CPU cycles drawing something you can't see?
        return;
    }

    let _alpha = context.globalAlpha;

    context.save();

    context.globalAlpha = alpha;

    if (roundPx)
    {
        x |= 0;
        y |= 0;
    }

    context.translate(x, y);

    context.scale(scaleX, scaleY);

    context.rotate(rotate);

    context.drawImage(
        image,
        srcX,
        srcY, 
        srcWidth,
        srcHeight, 
        -width * anchorX, 
        -height * anchorY,
        width,
        height
    );

    context.restore();

    context.globalAlpha = _alpha;

    return context;
    
}
