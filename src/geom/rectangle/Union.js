import Rectangle from './Rectangle.js';

export default function Union (rectA, rectB, output = Rectangle()) {

    let x = Math.min(rectA.x, rectB.x);
    let y = Math.min(rectA.y, rectB.y);

    return output.set(
        x,
        y,
        Math.max(rectA.right, rectB.right) - x,
        Math.max(rectA.bottom, rectB.bottom) - y
    );
    
}