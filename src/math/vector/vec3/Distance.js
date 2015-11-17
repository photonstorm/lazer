export default function (a, b) {

    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];

    return Math.sqrt(dx * dx + dy * dy + dz * dz);

}
