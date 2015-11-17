//  p = Point or any object with public x/y properties
export default function (p, cx, cy, angle) {

    const c = Math.cos(angle);
    const s = Math.sin(angle);

    const x = p.x - cx;
    const y = p.y - cy;

    p.x = x * c - y * s + cx;
    p.y = x * s + y * c + cy;

    return p;

}
