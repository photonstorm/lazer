/**
* Returns a uniformly distributed random point from anywhere within this Circle.
* 
* @method Phaser.Circle#random
* @param {Phaser.Point|object} [out] - A Phaser.Point, or any object with public x/y properties, that the values will be set in.
*     If no object is provided a new Phaser.Point object will be created. In high performance areas avoid this by re-using an existing object.
* @return {Phaser.Point} An object containing the random point in its `x` and `y` properties.
*/
export default function Random (circle, out = { x: 0, y: 0 }) {

    let t = 2 * Math.PI * Math.random();

    let u = Math.random() + Math.random();

    if (u > 1)
    {
        u = 2 - u;
    }

    let x = u * Math.cos(t);
    let y = u * Math.sin(t);

    out.x = circle.x + (x * circle.radius);
    out.y = circle.y + (y * circle.radius);

    return out;

}
