import AddEventListener from '../../../dom/AddEventListener.js';

//  Adds a keydown event listener to the specified target (usually 'window')

export default function AddKeyDown (target, listener, useCapture = false) {

    AddEventListener(target, 'keydown', listener, useCapture);

}
