//  Merges source rectangle into target rectangle and returns target
//  Neither rect should have negative widths or heights

export default function MergeRect (target, source) {

    let minX = Math.min(target.x, source.x);
    let maxX = Math.max(target.right, source.right);

    target.x = minX;
    target.width = maxX - minX;

    let minY = Math.min(target.y, source.y);
    let maxY = Math.max(target.bottom, source.bottom);

    target.y = minY;
    target.height = maxY - minY;

    return target;
    
}