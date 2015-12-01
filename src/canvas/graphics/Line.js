//  Encapsulates setting all the line properties in a single function

//  butt, round or square
//  bevel, round or miter
export default function Line (context, width = 1, cap = 'butt', join = 'bevel', segments = null, offset = 0, miter = 10) {

    context.lineWidth = width;
    context.lineCap = cap;
    context.lineJoin = join;
    context.miterLimit = miter;

    if (segments)
    {
        context.setLineDash(segments);
        context.lineDashOffset = offset;
    }
    
}
