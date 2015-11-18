import Move from 'canvas/Move.js';

export default function (canvas, distance, wrap = true) {

    return Move(canvas, distance, 0, wrap, false);
    
}