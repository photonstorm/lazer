
export function equal (a, b, precision = 1e-6) {

    return [
        Math.abs(a[0] - b) <= precision,
        Math.abs(a[1] - b) <= precision,
        Math.abs(a[2] - b) <= precision,
        Math.abs(a[3] - b) <= precision
    ];

}

export function less (a, b) {

    return [ a[0] < b, a[1] < b, a[2] < b, a[3] < b ];

}

export function greater (a, b) {

    return [ a[0] > b, a[1] > b, a[2] > b, a[3] > b ];

}

export function greaterEq (a, b) {

    return [ a[0] >= b, a[1] >= b, a[2] >= b, a[3] >= b ];

}
