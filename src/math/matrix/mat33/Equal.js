export default function (a, b, precision = 1e-6) {

    return (
        Math.abs(a[0] - b[0]) <= precision &&
        Math.abs(a[1] - b[1]) <= precision &&
        Math.abs(a[2] - b[2]) <= precision &&
        Math.abs(a[3] - b[3]) <= precision &&
        Math.abs(a[4] - b[4]) <= precision &&
        Math.abs(a[5] - b[5]) <= precision &&
        Math.abs(a[6] - b[6]) <= precision &&
        Math.abs(a[7] - b[7]) <= precision &&
        Math.abs(a[8] - b[8]) <= precision
    );

}
