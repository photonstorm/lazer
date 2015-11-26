import Convolve from 'canvas/filters/Convolve.js';

export default function Blur (imageData) {

    return Convolve(imageData, [ 1, 2, 1, 2, 4, 2, 1, 2, 1 ]);
    
}