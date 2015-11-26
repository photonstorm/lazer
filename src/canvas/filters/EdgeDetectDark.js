import Convolve from 'canvas/filters/Convolve.js';

export default function EdgeDetectDark (imageData) {

    return Convolve(imageData, [ -5, 0, 0, 0, 0, 0, 0, 0, 5 ]);
    
}