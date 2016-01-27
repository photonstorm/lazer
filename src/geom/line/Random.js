/**
* Picks a random point from anywhere on the Line segment and returns it.
* 
* @method Phaser.Line#random
* @param {Phaser.Point|object} [out] - A Phaser.Point, or any object with public x/y properties, that the values will be set in.
*     If no object is provided a new Phaser.Point object will be created. In high performance areas avoid this by re-using an object.
* @return {Phaser.Point} An object containing the random point in its `x` and `y` properties.
*/
export default function Random (line, out = { x: 0, y: 0 }) {

    let t = Math.random();

    out.x = line.x1 + t * (line.x2 - line.x1);
    out.y = line.y1 + t * (line.y2 - line.y1);

    return out;

}
