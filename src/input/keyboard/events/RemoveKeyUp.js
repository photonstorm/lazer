import RemoveEventListener from 'dom/RemoveEventListener.js';

export default function RemoveKeyUp (target, listener) {

    RemoveEventListener(target, 'keyup', listener);

}
