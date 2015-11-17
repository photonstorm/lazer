export function between (x1, y1, x2, y2) {

    let dx = x1 - x2;
    let dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);

}

export function squared (x1, y1, x2, y2) {

    let dx = x1 - x2;
    let dy = y1 - y2;

    return dx * dx + dy * dy;

}

export function power (x1, y1, x2, y2, pow = 2) {

    return Math.sqrt(Math.pow(x2 - x1, pow) + Math.pow(y2 - y1, pow));

}
