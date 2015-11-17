export function In (v) {

    return Math.pow(2, 10 * (v - 1)) - 0.001;
    
}

export function Out (v) {

    return 1 - Math.pow(2, -10 * v);

}

export function InOut (v) {

    if ((v *= 2) < 1)
    {
        return 0.5 * Math.pow(2, 10 * (v - 1));
    }
    else
    {
        return 0.5 * (2 - Math.pow(2, -10 * (v - 1)));
    }

}
