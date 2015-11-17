import Bernstein from 'math/Bernstein.js';

export default function (v, k) {

    let b = 0;
    let n = v.length - 1;

    for (let i = 0; i <= n; i++)
    {
        b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * Bernstein(n, i);
    }

    return b;

}
