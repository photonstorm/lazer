import AddEventListener from '../../../dom/AddEventListener.js';

//  Adds a keyup event listener to the specified target (usually 'window')

export default function AddKeyUp (target, listener, useCapture = false) {

    AddEventListener(target, 'keyup', listener, useCapture);

}
