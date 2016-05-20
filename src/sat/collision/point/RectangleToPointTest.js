let Abs = Math.abs;
// Expects rectangle data to be laid like this:
// [x, y, width, height]
export default function (point, rectangle) {
    let halfWidth = rectangle[2] / 2;
    let halfHeight = rectangle[3] / 2;
    let distanceX = (rectangle[0] + halfWidth) - (point[0]);
    let distanceY = (rectangle[1] + halfHeight) - (point[1]);
    if (halfWidth - Abs(distanceX) < 0 ||
        halfHeight - Abs(distanceY) < 0)
        return false;
    return true;
}