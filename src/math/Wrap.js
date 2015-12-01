export default function Wrap (value, min, max) {

    let range = max - min;

    if (range <= 0)
    {
        return 0;
    }

    let result = (value - min) % range;

    if (result < 0)
    {
        result += range;
    }

    return result + min;

}
