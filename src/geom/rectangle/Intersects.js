import Rectangle from 'geom/rectangle/Rectangle.js';

export function rect (rectA, rectB) {

    if (rectA.empty || rectB.empty)
    {
        return false;
    }

    return !(
        rectA.right < rectB.x || 
        rectA.bottom < rectB.y || 
        rectA.x > rectB.right || 
        rectA.y > rectB.bottom
    );
    
}

export function raw (rectA, left, right, top, bottom, tolerance = 0) {

    if (rectA.empty)
    {
        return false;
    }

    return !(
        left > rectA.right + tolerance ||
        right < rectA.left - tolerance ||
        top > rectA.bottom + tolerance ||
        bottom < rectA.top - tolerance
    );

};

export function intersection (rectA, rectB, output = new Rectangle()) {

    if (this.rect(rectA, rectB))
    {
        output.setTo(
            Math.max(a.x, b.x),
            Math.max(a.y, b.y),
            Math.min(a.right, b.right) - output.x,
            Math.min(a.bottom, b.bottom) - output.y
        );
    }

    return output;

}
