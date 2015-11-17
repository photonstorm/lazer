import Linear from 'math/Linear.js';

export default function (v, k) {

    let m = v.length - 1;
    let f = m * k;
    let i = Math.floor(f);

    if (k < 0)
    {
        return Linear(v[0], v[1], f);
    }

    if (k > 1)
    {
        return Linear(v[m], v[m - 1], m - f);
    }

    return Linear(v[i], v[(i + 1 > m) ? m : i + 1], f - i);

}
