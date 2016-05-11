import GetContext from '../GetContext.js';
import SetTransform from '../SetTransform.js';
import ResetTransform from '../ResetTransform.js';

export default function Move (canvas, tx, ty, wrapX = true, wrapY = true) {

    const ctx = GetContext(canvas);

    let type = 'no-repeat';

    if (wrapX && wrapY)
    {
        type = 'repeat';
    }
    else if (wrapX)
    {
        type = 'repeat-x';
    }
    else if (wrapY)
    {
        type = 'repeat-y';
    }

    //  Make a fill pattern from the canvas
    let pattern = ctx.createPattern(canvas, type);
    
    const oldFill = ctx.fillStyle;

    ctx.fillStyle = pattern;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    SetTransform(ctx, tx, ty);

    ctx.fillRect(tx *= -1, ty *= -1, canvas.width, canvas.height);

    ctx.fillStyle = oldFill;

    ResetTransform(ctx);

    pattern = undefined;

    return canvas;
    
}