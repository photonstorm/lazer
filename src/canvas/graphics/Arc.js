//  Warning: Doesn't save context state OR begin or close the path

//  startAngle, endAngle and rotation are in radians
//  The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.

export default function Arc (context, x, y, radius = 128, startAngle = 0, endAngle = 360, rotation = 0, antiClockwise = false) {

    if (startAngle > endAngle)
    {
        let temp = startAngle;
        startAngle = endAngle;
        endAngle = temp;
    }

    context.translate(x, y);
    context.rotate(rotation);

    context.arc(0, 0, radius, startAngle, endAngle, antiClockwise);

}
