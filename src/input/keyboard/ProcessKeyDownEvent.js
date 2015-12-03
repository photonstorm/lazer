export let event = null;
export let enabled = true;
export let capture = new Set();
export let keyCode = 0;

export default function ProcessKeyDownEvent (e) {

    console.log(e);

    event = e;

    if (!enabled)
    {
        return;
    }

    //   The event is being captured but another hotkey may need it
    if (capture.has[e.keyCode])
    {
        e.preventDefault();
    }

    // if (!this._keys[event.keyCode])
    // {
    //     this._keys[event.keyCode] = new Phaser.Key(this.game, event.keyCode);
    // }

    // this._keys[event.keyCode].processKeyDown(event);

    keyCode = e.keyCode;

    // if (this.onDownCallback)
    // {
    //     this.onDownCallback.call(this.callbackContext, event);
    // }

}