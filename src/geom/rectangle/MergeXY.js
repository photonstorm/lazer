
export default function MergeXY (target, x, y) {

    let minX = Math.min(target.x, x);
    let maxX = Math.max(target.right, x);

    target.x = minX;
    target.width = maxX - minX;

    let minY = Math.min(target.y, y);
    let maxY = Math.max(target.bottom, y);

    target.y = minY;
    target.height = maxY - minY;

    return target;
    
}