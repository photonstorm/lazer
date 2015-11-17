import Wrap from 'math/Wrap.js';

export function between (x1, y1, x2, y2) {

    return Math.atan2(y2 - y1, x2 - x1);

}

export function betweenY (x1, y1, x2, y2) {

    return Math.atan2(x2 - x1, y2 - y1);

}

export function betweenPoints (point1, point2) {

    return Math.atan2(point2.y - point1.y, point2.x - point1.x);

}

export function betweenPointsY (point1, point2) {

    return Math.atan2(point2.x - point1.x, point2.y - point1.y);

}

export function reverse (angle) {

    return this.normalize(angle + Math.PI);

}

export function normalize (angle) {

    angle = angle % (2 * Math.PI);

    if (angle >= 0)
    {
        return angle;
    }
    else
    {
        return angle + 2 * Math.PI;
    }

}

export function wrap (angle) {

    return Wrap(angle, -Math.PI, Math.PI);

}

export function wrapDeg (angle) {

    return Wrap(angle, -180, 180);

}
