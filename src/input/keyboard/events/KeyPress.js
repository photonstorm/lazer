import AddEventListener from 'dom/AddEventListener.js';
import RemoveEventListener from 'dom/RemoveEventListener.js';

export function add (target, listener, useCapture = false) {

    AddEventListener(target, 'keypress', listener, useCapture);

}

export function remove (target, listener) {

    RemoveEventListener(target, 'keypress', listener);

}
