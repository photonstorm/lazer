
export function to (value, gap, start = 0) {

    if (gap === 0)
    {
        return value;
    }

    value -= start;
    value = gap * Math.round(value / gap);

    return start + value;

}

export function floor (value, gap, start = 0) {

    if (gap === 0)
    {
        return value;
    }

    value -= start;
    value = gap * Math.floor(value / gap);

    return start + value;

}

export function ceil (value, gap, start = 0) {

    if (gap === 0)
    {
        return value;
    }

    value -= start;
    value = gap * Math.ceil(value / gap);

    return start + value;

}
