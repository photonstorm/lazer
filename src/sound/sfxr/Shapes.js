export const SQUARE = 0;
export const SAWTOOTH = 1;
export const SINE = 2;
export const NOISE = 3;
export const TRIANGLE = 4;
export const BREAKER = 5;

let shapes = [ SQUARE, SAWTOOTH, SINE, NOISE, TRIANGLE, BREAKER ];

//  Must provide frnd, a function that returns a random number (seedable if needed)

//  Returns a random shape

export default function GetShape (frnd) {

    return Math.floor(frnd(shapes.length));
    
}