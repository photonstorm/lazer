export default function (q1, q2, precision = 1e-6) {

    return (
        Math.abs(q1[0] - q2[0]) <= precision &&
        Math.abs(q1[1] - q2[1]) <= precision &&
        Math.abs(q1[2] - q2[2]) <= precision &&
        Math.abs(q1[3] - q2[3]) <= precision
    );

}
