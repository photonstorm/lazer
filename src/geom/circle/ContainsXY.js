/**
* Return true if the given x/y coordinates are within the Circle object.
* @method Phaser.Circle.contains
* @param {Phaser.Circle} a - The Circle to be checked.
* @param {number} x - The X value of the coordinate to test.
* @param {number} y - The Y value of the coordinate to test.
* @return {boolean} True if the coordinates are within this circle, otherwise false.
*/
export default function ContainsXY (circle, x, y) {

    if (circle.radius <= 0 ||
        x < circle.left ||
        x > circle.right ||
        y < circle.top ||
        y > circle.bottom)
    {
        return false;
    }
    else
    {
        let dx = (circle.x - x) * (circle.x - x);
        let dy = (circle.y - y) * (circle.y - y);

        return (dx + dy) <= circle.diameter;
    }

}
