import Move from 'canvas/Move.js';

export default function (canvas, distance, wrap = true) {

    return Move(canvas, 0, distance, false, wrap);
    
}