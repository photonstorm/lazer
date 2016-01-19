export default function DistancePower (x1, y1, x2, y2, pow = 2) {

    return Math.sqrt(Math.pow(x2 - x1, pow) + Math.pow(y2 - y1, pow));

}
