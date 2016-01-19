export default function DistanceSquared (x1, y1, x2, y2) {

    let dx = x1 - x2;
    let dy = y1 - y2;

    return dx * dx + dy * dy;

}
