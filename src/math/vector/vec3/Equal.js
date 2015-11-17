
export default function (a, b, precision = 1e-6) {

    return (
        Math.abs(a[0] - b[0]) <= precision &&
        Math.abs(a[1] - b[1]) <= precision &&
        Math.abs(a[2] - b[2]) <= precision
    );

}
