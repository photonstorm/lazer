import AddEventListener from '../../../dom/AddEventListener.js';

//  Adds a keypress event listener to the specified target (usually 'window')

export default function AddKeyPress (target, listener, useCapture = false) {

    AddEventListener(target, 'keypress', listener, useCapture);

}
