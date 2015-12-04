import RemoveEventListener from 'dom/RemoveEventListener.js';

export default function RemoveKeyPress (target, listener) {

    RemoveEventListener(target, 'keypress', listener);

}
