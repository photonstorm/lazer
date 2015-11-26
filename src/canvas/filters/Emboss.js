import Convolve from 'canvas/filters/Convolve.js';

export default function Emboss (imageData, offset = 127) {

    return Convolve(imageData, [ 2, 0, 0, 0, -1, 0, 0, 0, -1 ], false, offset);
    
}