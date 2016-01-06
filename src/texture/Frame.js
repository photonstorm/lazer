/**
* A Frame is a single frame of texture atlas (or a whole image)
*
* @class Frame
* @constructor
* @param {string} [name] - The name of the frame. In Texture Atlas data this is usually set to the filename.
* @param {Image|Canvas} source - Reference to the source image / canvas.
* @param {number} x - X position of the frame within the texture image.
* @param {number} y - Y position of the frame within the texture image.
* @param {number} width - Width of the frame within the texture image.
* @param {number} height - Height of the frame within the texture image.
*/
export default function Frame (name, source, x, y, width, height) {

    return {

        /**
        * @property {string} name - If the Frame is part of a Texture Atlas this is the 'filename' or key value. Can contain a / or \ if 'Folder names' was enabled in Texture Packer.
        */
        name: name,

        /**
        * @property {Image|Canvas} source - A reference to the source image (or canvas) that this frame is bound to.
        */
        source: source,

        /**
        * @property {number} x - X position within the image to cut from (in atlas json: frame.x)
        */
        x: x,

        /**
        * @property {number} y - Y position within the image to cut from (in atlas json: frame.y)
        */
        y: y,

        /**
        * @property {number} width - Width of the frame to cut from the image (in atlas json: frame.w)
        */
        width: width,

        /**
        * @property {number} height - Height of the frame to cut from the image (in atlas json: frame.h)
        */
        height: height,

        /**
        * @property {number} rotation - If the frame is rotated this holds the amount of rotation to be applied.
        * @default
        */
        rotation: 0,

        /**
        * @property {number} sourceWidth - Width of the original sprite before it was trimmed (sourceSize.w)
        */
        sourceWidth: width,

        /**
        * @property {number} sourceHeight - Height of the original sprite before it was trimmed (sourceSize.h)
        */
        sourceHeight: height,

        /**
        * @property {boolean} trimmed - Was it trimmed when packed?
        * @default
        */
        trimmed: false,

        /**
        * @property {number} trimX - X position of the trimmed sprite inside original sprite (spriteSourceSize.x)
        * @default
        */
        trimX: 0,

        /**
        * @property {number} trimY - Y position of the trimmed sprite inside original sprite (spriteSourceSize.y)
        * @default
        */
        trimY: 0,

        /**
        * @property {number} trimWidth - Width of the trimmed sprite (spriteSourceSize.w)
        * @default
        */
        trimWidth: 0,

        /**
        * @property {number} trimHeight - Height of the trimmed sprite (spriteSourceSize.h)
        * @default
        */
        trimHeight: 0

    };

}