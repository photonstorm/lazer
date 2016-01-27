export default function PerpSlope (line) {

    return -((line.x2 - line.x1) / (line.y2 - line.y1));

}
