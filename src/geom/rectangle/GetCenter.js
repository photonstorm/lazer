//  The center of the Rectangle object, expressed as a Point object 

export default function GetCenter (rect, out = { x: 0, y: 0 }) {

    out.x = rect.right / 2;
    out.y = rect.bottom / 2;

    return out;
    
}