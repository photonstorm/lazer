
export function equal (a, b, epsilon = 0.0001) {

    return Math.abs(a - b) < epsilon;

}

export function lessThan (a, b, epsilon = 0.0001) {

    return a < b + epsilon;

}

export function greaterThan (a, b, epsilon = 0.0001) {

    return a > b - epsilon;

}

export function ceil (value, epsilon = 0.0001) {

    return Math.ceil(value - epsilon);

}

export function floor (value, epsilon = 0.0001) {

    return Math.floor(value + epsilon);

}
