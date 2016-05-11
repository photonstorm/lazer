
export default function Equal(a, b, precision = 1e-6) {

    return (
        Math.abs(a[0] - b[0]) <= precision &&
        Math.abs(a[1] - b[1]) <= precision
    );

}
