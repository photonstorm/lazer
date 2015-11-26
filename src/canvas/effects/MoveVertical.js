import Move from 'canvas/effects/Move.js';

export default function MoveVertical (canvas, distance, wrap = true) {

    return Move(canvas, 0, distance, false, wrap);
    
}