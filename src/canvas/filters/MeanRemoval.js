import Convolve from './Convolve.js';

export default function MeanRemoval (imageData) {

    return Convolve(imageData, [-1, -1, -1, -1, 9, -1, -1, -1, -1]);
    
}