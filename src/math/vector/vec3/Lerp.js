//  A linear interpolation between a and b (by amount 't')
//  Set into a which is returned

export default function (a, b, t) {

    a[0] += (b[0] - a[0]) * t;
    a[1] += (b[1] - a[1]) * t;
    a[2] += (b[2] - a[2]) * t;

    return a;

}
