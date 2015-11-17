export default function (v, angle) {

    let x = v[0];
    let y = v[1];

    v[0] = x * Math.cos(angle) - y * Math.sin(angle);
    v[1] = x * Math.sin(angle) + y * Math.cos(angle);

    return v;

}
