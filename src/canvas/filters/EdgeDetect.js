import Convolve from './Convolve.js';

export default function EdgeDetect (imageData) {

    return Convolve(imageData, [ 1, 1, 1, 1, -7, 1, 1, 1, 1 ]);
    
}