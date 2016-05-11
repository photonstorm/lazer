export default function Factorial(value) {

    if (value === 0)
    {
        return 1;
    }

    let res = value;

    while (--value)
    {
        res *= value;
    }

    return res;

}