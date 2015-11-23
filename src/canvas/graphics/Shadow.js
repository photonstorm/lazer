/**
* Sets the shadow properties of this BitmapDatas context which will affect all draw operations made to it.
* You can cancel an existing shadow by calling this method and passing no parameters.
* Note: At the time of writing (October 2014) Chrome still doesn't support shadowBlur used with drawImage.
*
* @method Phaser.BitmapData#shadow
* @param {string} color - The color of the shadow, given in a CSS format, i.e. `#000000` or `rgba(0,0,0,1)`. If `null` or `undefined` the shadow will be reset.
* @param {number} [blur=5] - The amount the shadow will be blurred by. Low values = a crisp shadow, high values = a softer shadow.
* @param {number} [x=10] - The horizontal offset of the shadow in pixels.
* @param {number} [y=10] - The vertical offset of the shadow in pixels.
* @return {Phaser.BitmapData} This BitmapData object for method chaining.
*/
export default function Shadow (context, color = 'rgba(0,0,0,0)', blur = 5, x = 10, y = 10) {

    context.shadowColor = color;

    context.shadowBlur = blur;

    context.shadowOffsetX = x;
    context.shadowOffsetY = y;

}
