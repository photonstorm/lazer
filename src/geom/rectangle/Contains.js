export function xy (rect, x, y) {

    if (rect.width <= 0 || rect.height <= 0 ||rect.empty)
    {
        return false;
    }

    return (x >= rect.x && x < rect.right && y >= rect.y && y < rect.bottom);
    
}

export function vec2 (rect, vec2) {

    if (rect.width <= 0 || rect.height <= 0 ||rect.empty)
    {
        return false;
    }

    return (vec2.x >= rect.x && vec2.x < rect.right && vec2.y >= rect.y && vec2.y < rect.bottom);

}

export function rect (rectA, rectB) {

    if (rectA.volume > rectB.volume)
    {
        return false;
    }

    return (
        rectA.x >= rectB.x && 
        rectA.y >= rectB.y && 
        rectA.right < rectB.right && 
        rectA.bottom < rectB.bottom
    );

}