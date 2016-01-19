//  The size of the Rectangle object, expressed as a Point object 
//  with the values of the width and height properties.

export default function GetSize (rect, out = { x: 0, y: 0 }) {

    out.x = rect.width;
    out.y = rect.height;

    return out;
    
}