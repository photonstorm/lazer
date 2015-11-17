export function byValue (rect, x, y) {

    const x = rect.x -= x;
    const y = rect.y -= y;
    const w = rect.width += 2 * x;
    const h = rect.height += 2 * y;

    return rect.setTo(x, y, w, h);
    
}

export function byVec2 (rect, vec2) {

    const x = rect.x -= vec2.x;
    const y = rect.y -= vec2.y;
    const w = rect.width += 2 * vec2.x;
    const h = rect.height += 2 * vec2.y;

    return rect.setTo(x, y, w, h);
    
}
