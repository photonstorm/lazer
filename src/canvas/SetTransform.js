/**
* Sets the transform of the given canvas to the matrix values provided.
*
* @param {CanvasRenderingContext2D} context - The context to set the transform on.
* @param {number} translateX - The value to translate horizontally by.
* @param {number} translateY - The value to translate vertically by.
* @param {number} scaleX - The value to scale horizontally by.
* @param {number} scaleY - The value to scale vertically by.
* @param {number} skewX - The value to skew horizontaly by.
* @param {number} skewY - The value to skew vertically by.
* @return {CanvasRenderingContext2D} Returns the source context.
*/
export default function SetTransform (context, translateX = 0, translateY = 0, scaleX = 1, scaleY = 1, skewX = 0, skewY = 0) {

    context.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);

    return context;

}
