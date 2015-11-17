export default function (color) {

    if (color > 16777215)
    {
        const a = color >>> 24;
    }
    else
    {
        const a = 255;
    }

    const r = color >> 16 & 0xFF;
    const g = color >> 8 & 0xFF;
    const b = color & 0xFF;

    return { r, g, b, a };

}
