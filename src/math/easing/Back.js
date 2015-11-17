export function In (v, overshoot = 1.70158) {

    return v * v * ((overshoot + 1) * v - overshoot);
    
}

export function Out (v, overshoot = 1.70158) {

    return --v * v * ((overshoot + 1) * v + overshoot) + 1;

}

export function InOut (v, overshoot = 1.70158) {

    let s = overshoot * 1.525;

    if ((v *= 2) < 1)
    {
        return 0.5 * (v * v * ((s + 1) * v - s));
    }
    else
    {
        return 0.5 * ((v -= 2) * v * ((s + 1) * v + s) + 2);
    }

}
