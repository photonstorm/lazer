//  p = Point or any object with public x/y properties
export default function (p, angle) {

    let x = p.x;
    let y = p.y;

    p.x = x * Math.cos(angle) - y * Math.sin(angle);
    p.y = x * Math.sin(angle) + y * Math.cos(angle);

    return p;

}
