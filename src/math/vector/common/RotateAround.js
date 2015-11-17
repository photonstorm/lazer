export default function (v, cx, cy, angle) {

    const c = Math.cos(angle);
    const s = Math.sin(angle);

    const x = v[0] - cx;
    const y = v[1] - cy;

    v[0] = x * c - y * s + cx;
    v[1] = x * s + y * c + cy;

    return v;

}
