export default function Distance(a, b) {

    const dx = a[0] - b[0];
    const dy = a[1] - b[1];

    return Math.sqrt(dx * dx + dy * dy);

}
