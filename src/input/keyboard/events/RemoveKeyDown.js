import RemoveEventListener from 'dom/RemoveEventListener.js';

export default function RemoveKeyDown (target, listener) {

    RemoveEventListener(target, 'keydown', listener);

}
