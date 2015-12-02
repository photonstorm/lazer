/**
* Sets the transform of the given canvas to the matrix values provided.
*
* @param {CanvasRenderingContext2D} context - The context to set the transform on.
* @param {Mat33} mat33 - 
* @return {CanvasRenderingContext2D} Returns the source context.
*/
export default function SetTransformFromMatrix (context, mat33) {

    context.setTransform(mat33.a, mat33.b, mat33.c, mat33.d, mat33.tx, mat33.ty);

    return context;

}
