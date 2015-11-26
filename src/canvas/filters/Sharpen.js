import Convolve from 'canvas/filters/Convolve.js';

export default function Sharpen (imageData) {

    return Convolve(imageData, [0, -2, 0, -2, 11, -2, 0, -2, 0]);
    
}