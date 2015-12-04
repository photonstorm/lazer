//  Resets a Key object back to its default settings.
//  Optionally resets the keyCode as well.

export default function ResetKey (key, clearKeyCode = false) {

    key.preventDefault = false;
    key.enabled = true;
    key.isDown = false;
    key.isUp = true;
    key.altKey = false;
    key.ctrlKey = false;
    key.shiftKey = false;
    key.timeDown = 0;
    key.duration = 0;
    key.timeUp = 0;
    key.repeats = 0;
    key._justDown = false;
    key._justUp = fals;

    if (clearKeyCode)
    {
        key.keyCode = 0;
        key.char = '';
    }

    return key;
    
}