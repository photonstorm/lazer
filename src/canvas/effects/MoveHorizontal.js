import Move from '../effects/Move.js';

export default function MoveHorizontal (canvas, distance, wrap = true) {

    return Move(canvas, distance, 0, wrap, false);
    
}