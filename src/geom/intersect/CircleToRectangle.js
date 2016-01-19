/**
* Checks if the given Circle and Rectangle objects intersect.
* @method Phaser.Circle.intersectsRectangle
* @param {Phaser.Circle} c - The Circle object to test.
* @param {Phaser.Rectangle} r - The Rectangle object to test.
* @return {boolean} True if the two objects intersect, otherwise false.
*/
export default function CircleToRectangle (circle, rect) {

    let halfWidth = rect.width / 2;
    let halfHeight = rect.height / 2;

    let cx = Math.abs(circle.x - rect.x - halfWidth);
    let xDist = halfWidth + circle.radius;

    if (cx > xDist)
    {
        return false;
    }

    let cy = Math.abs(circle.y - rect.y - halfHeight);
    let yDist = halfHeight + circle.radius;

    if (cy > yDist)
    {
        return false;
    }

    if (cx <= halfWidth || cy <= halfHeight)
    {
        return true;
    }

    let xDistSq = (cx - halfWidth) * (cx - halfWidth);
    let yDistSq = (cy - halfHeight) * (cy - halfHeight);

    return (xDistSq + yDistSq <= circle.diameter);

}
