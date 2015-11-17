
export function equal (a, b, precision = 1e-6) {

    return (
        Math.abs(a[0] - b[0]) <= precision &&
        Math.abs(a[1] - b[1]) <= precision &&
        Math.abs(a[2] - b[2]) <= precision &&
        Math.abs(a[3] - b[3]) <= precision
    );

}

export function less (a, b) {

    return [ 
        a[0] < b[0], 
        a[1] < b[1], 
        a[2] < b[2], 
        a[3] < b[3]
    ];

}

export function greater (a, b) {

    return [ 
        a[0] > b[0], 
        a[1] > b[1], 
        a[2] > b[2], 
        a[3] > b[3]
    ];

}

export function greaterEq (a, b) {

    return [ 
        a[0] >= b[0], 
        a[1] >= b[1], 
        a[2] >= b[2], 
        a[3] >= b[3]
    ];

}

export function not (a) {

    return [ !a[0], !a[1], !a[2], !a[3] ];

}

export function or (a, b) {

    return [ 
        a[0] || b[0], 
        a[1] || b[1], 
        a[2] || b[2],
        a[3] || b[3]
    ];

}

export function and (a, b) {

    return [ 
        a[0] && b[0], 
        a[1] && b[1], 
        a[2] && b[2],
        a[3] && b[3] 
    ];

}

export function all (m) {

    return (m[0] && m[1] && m[2] && m[3]);

}
