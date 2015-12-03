import ProcessKeyDownEvent from 'input/keyboard/ProcessKeyDownEvent.js';

let onKeyDown = ProcessKeyDownEvent;
let onKeyUp = null;
let onKeyPress = null;

export default function KeyboardEventListeners (root, onDown, onUp, onPress) {

    // onKeyDown = (e) => onDown(e);
    // onKeyUp = (e) => onUp(e);
    // onKeyPress = (e) => onPress(e);

    root.addEventListener('keydown', onKeyDown, false);
    // root.addEventListener('keyup', onKeyUp, false);
    // root.addEventListener('keypress', onKeyPress, false);

}

export function remove (root) {

    root.addEventListener('keydown', onKeyDown);
    root.addEventListener('keyup', onKeyUp);
    root.addEventListener('keypress', onKeyPress);

}
