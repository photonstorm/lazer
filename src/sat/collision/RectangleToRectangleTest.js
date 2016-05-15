let Abs = Math.abs;
// Expects rectangle data to be laid like this:
// [x, y, width, height]
export default function (rectangleA, rectangleB) {
    let halfWidthA = rectangleA[2] / 2;
    let halfWidthB = rectangleB[2] / 2;
    let halfHeightA = rectangleA[3] / 2;
    let halfHeightB = rectangleB[3] / 2;
    let distanceX = (rectangleB[0] + halfWidthB) - (rectangleA[0] + halfWidthA);
    let distanceY = (rectangleB[1] + halfHeightB) - (rectangleA[1] + halfHeightA);
    if (halfWidthA + halfWidthB - Abs(distanceX) < 0 ||
        halfHeightA + halfHeightB - Abs(distanceY) < 0)
        return false;
    return true;
}