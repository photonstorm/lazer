//  Warning: Doesn't save context state OR begin or close the path

//  rotation is in radians
export default function Rectangle (context, x, y, width = 128, height = 128, rotation = 0, fromCenter = false) {

    context.translate(x, y);
    context.rotate(rotation);

    if (fromCenter)
    {
        context.rect(-width * 0.5, -height * 0.5, width, height);
    }
    else
    {
        context.rect(0, 0, width, height);
    }

}