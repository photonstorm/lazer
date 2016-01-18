export default function Area (circle) {

    if (circle.radius > 0)
    {
        return Math.PI * circle.radius * circle.radius;
    }
    else
    {
        return 0;
    }

}