import AddEventListener from 'dom/AddEventListener.js';
import RemoveEventListener from 'dom/RemoveEventListener.js';

export function add (target, listener, useCapture = false) {

    AddEventListener(target, 'keydown', listener, useCapture);

}

export function remove (target, listener) {

    RemoveEventListener(target, 'keydown', listener);

}
