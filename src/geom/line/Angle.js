export default function Angle (line) {

    return Math.atan2(line.y2 - line.y1, line.x2 - line.x1);

}
