export default function AddEventListener (target, event, listener, useCapture = false) {

    target.addEventListener(event, listener, useCapture);
    
}
