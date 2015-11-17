let vec4 = Float32Array;

export default function (a, b, precision = 1e-6) {

    return (
        Math.abs(a[0] - b) <= precision &&
        Math.abs(a[1] - b) <= precision &&
        Math.abs(a[2] - b) <= precision &&
        Math.abs(a[3] - b) <= precision
    );

}
