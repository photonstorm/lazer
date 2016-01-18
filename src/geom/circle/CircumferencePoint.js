export default function CircumferencePoint (circle, angle, out = { x: 0, y: 0 }) {

    out.x = circle.x + circle.radius * Math.cos(angle);
    out.y = circle.y + circle.radius * Math.sin(angle);

    return out;

}
