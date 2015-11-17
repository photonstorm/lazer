import CatmullRom from 'math/CatmullRom.js';

export default function (v, k) {

    let m = v.length - 1;
    let f = m * k;
    let i = Math.floor(f);

    if (v[0] === v[m])
    {
        if (k < 0)
        {
            i = Math.floor(f = m * (1 + k));
        }

        return CatmullRom(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    }
    else
    {
        if (k < 0)
        {
            return v[0] - (CatmullRom(v[0], v[0], v[1], v[1], -f) - v[0]);
        }

        if (k > 1)
        {
            return v[m] - (CatmullRom(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
        }

        return CatmullRom(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }

}
