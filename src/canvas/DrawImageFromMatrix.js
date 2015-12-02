
export default function DrawImageFromMatrix (context, image, mat33, alpha = 1, blendMode = null) {

    const prevAlpha = context.globalAlpha;
    const prevOp = context.globalCompositeOperation;

    context.save();

    context.globalAlpha = alpha;

    if (blendMode)
    {
        context.globalCompositeOperation = blendMode;
    }

    context.setTransform(mat33.a, mat33.b, mat33.c, mat33.d, mat33.tx, mat33.ty);

    context.drawImage(image, 0, 0);

    context.restore();

    context.globalAlpha = prevAlpha;
    context.globalCompositeOperation = prevOp;

    return context;
    
}
