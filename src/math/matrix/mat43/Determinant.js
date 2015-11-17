export default function (m) {

    return (
        m[0] * (m[4] * m[8] - m[5] * m[7]) +
        m[1] * (m[5] * m[6] - m[3] * m[8]) +
        m[2] * (m[3] * m[7] - m[4] * m[6])
    );

}
