//  Merges the target Rectangle with a list of points.
//  The points is an array of objects with public x/y properties.

export default function MergePoints (target, points) {

    let minX = target.x;
    let maxX = target.right;
    let minY = target.y;
    let maxY = target.bottom;

    for (let i = 0; i < points.length; i++)
    {
        minX = Math.min(minX, points[i].x);
        maxX = Math.max(maxX, points[i].x);
        minY = Math.min(minY, points[i].y);
        maxY = Math.max(maxY, points[i].y);
    }

    target.x = minX;
    target.y = minY;
    target.width = maxX - minX;
    target.height = maxY - minY;

    return target;
    
}