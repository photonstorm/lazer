/**
* Returns the framing rectangle of the circle as a Phaser.Rectangle object.
* 
* @method Phaser.Circle#getBounds
* @return {Phaser.Rectangle} The bounds of the Circle.
*/
export default function GetBounds (circle, out = { x: 0, y: 0, width: 0, height: 0 }) {

    out.x = circle.x - circle.radius;
    out.y = circle.y - circle.radius;
    out.width = circle.diameter;
    out.height = circle.diameter;

    return out;

}
