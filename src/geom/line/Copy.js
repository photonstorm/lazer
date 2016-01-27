/**
* Copies the x, y and diameter properties from any given object to this Circle.
* @method Phaser.Circle#copyFrom
* @param {any} source - The object to copy from.
* @return {Circle} This Circle object.
*/
export default function Copy (source, dest) {

    return dest.set(source.x1, source.y1, source.x2, source.y2);

}
