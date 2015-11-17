export function In (v) {

    return v * v;
    
}

export function Out (v) {

    return v * (2 - v);

}

export function InOut (v) {

    if ((v *= 2) < 1)
    {
        return 0.5 * v * v;
    }
    else
    {
        return -0.5 * (--v * (v - 2) - 1);
    }

}
