import Rectangle from 'geom/rectangle/Rectangle.js';

export default function (rectA, rectB, output = new Rectangle()) {

    const x = Math.min(rectA.left, rectB.left);
    const y = Math.min(rectA.top, rectB.top);

    return output.setTo(
        x,
        y,
        Math.max(rectA.right, rectB.right) - x,
        Math.max(rectA.bottom, rectB.bottom) - y
    );
    
}