/**
* Using Bresenham's line algorithm this will return an array of all coordinates on this line.
* The start and end points are rounded before this runs as the algorithm works on integers.
*
* @method Phaser.Line#coordinatesOnLine
* @param {number} [stepRate=1] - How many steps will we return? 1 = every coordinate on the line, 2 = every other coordinate, etc.
* @param {array} [results] - The array to store the results in. If not provided a new one will be generated.
* @return {array} An array of coordinates.
*/
export default function BresenhamLine (line, stepRate = 1, results = []) {

    let x1 = Math.round(line.x1);
    let y1 = Math.round(line.y1);
    let x2 = Math.round(line.x2);
    let y2 = Math.round(line.y2);

    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = (x1 < x2) ? 1 : -1;
    let sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    results.push([x1, y1]);

    let i = 1;

    while (!((x1 == x2) && (y1 == y2)))
    {
        let e2 = err << 1;

        if (e2 > -dy)
        {
            err -= dy;
            x1 += sx;
        }

        if (e2 < dx)
        {
            err += dx;
            y1 += sy;
        }

        if (i % stepRate === 0)
        {
            results.push([x1, y1]);
        }

        i++;
    }

    return results;

}
