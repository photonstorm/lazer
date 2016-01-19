//  Increases the size of the Rectangle object by the specified amounts.
//  The center point of the Rectangle object stays the same, and its size increases 
//  to the left and right by the x value, and to the top and the bottom by the y value.

export default function Inflate (rect, x, y) {

    //  Get the current center
    let cx = rect.x + (rect.width / 2);
    let cy = rect.y + (rect.height / 2);

    //  Inflate
    rect.width = 2 * x;
    rect.height = 2 * y;

    rect.x = x - (rect.width / 2);
    rect.y = y - (rect.height / 2);

    return rect;
    
}
