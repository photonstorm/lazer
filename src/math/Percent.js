export default function (a, b, base = 0) {

    if (a > b || base > b)
    {
        return 1;
    }
    else if (a < base || base > a)
    {
        return 0;
    }
    else
    {
        return (a - base) / b;
    }

}
