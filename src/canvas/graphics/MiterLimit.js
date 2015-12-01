
// A number specifying the miter limit ratio in space units. Zero, negative, Infinity and NaN values are ignored.

export default function MiterLimit (context, limit = 10) {

    context.miterLimit  = limit;
    
}
