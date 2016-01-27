/**
* Centers this Line on the given coordinates.
* 
* The line is centered by positioning the start and end points so that the lines midpoint matches
* the coordinates given.
* 
* @method Phaser.Line#centerOn
* @param {number} x - The x position to center the line on.
* @param {number} y - The y position to center the line on.
* @return {Phaser.Line} This line object
*/
export default function CenterOn (line, x = 0, y = 0) {

    let tx = x - ((line.x1 + line.x2) / 2);
    let ty = y - ((line.y1 + line.y2) / 2);

    line.x1 += tx;
    line.y1 += ty;

    line.x2 += tx;
    line.y2 += ty;

    return line;

}