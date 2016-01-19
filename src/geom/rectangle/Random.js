export default function Random (rect, out = { x: 0, y: 0 }) {

    out.x = rect.x + (Math.random() * rect.width);
    out.y = rect.y + (Math.random() * rect.height);

    return out;

}
