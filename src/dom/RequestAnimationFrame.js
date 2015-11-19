import NOOP from 'system/NOOP.js';

export default class RequestAnimationFrame {

    constructor (root, forceSetTimeOut = false) {

        this.root = root;
        this.forceSetTimeOut = forceSetTimeOut;

        //  If there's no window object or RAF then we have to use ST anyway
        if (!forceSetTimeOut)
        {
            this.forceSetTimeOut = !this.normalizeRaf();
        }

        this._running = false;
        this._timeOutID = null;
        this._callback = NOOP;

    }

    //  Under SetTimeout the callback must return the ms value of when to run the next update
    start (callback) {

        if (!this._running)
        {
            this._running = true;
            this._callback = callback;

            if (this.usingSetTimeout)
            {
                this._timeOutID = this.root.setTimeout(now => this.updateSetTimeout(Date.now()), 0);
            }
            else
            {
                this._timeOutID = this.root.requestAnimationFrame(now => this.updateRAF(now));
            }
        }

    }

    updateRAF (now) {

        this._callback(now);

        this._timeOutID = this.root.requestAnimationFrame(now => this.updateRAF(now));

    }

    updateSetTimeout (now) {

        this._timeOutID = this.root.setTimeout(now => this.updateSetTimeout(Date.now()), 0);

    }

    stop () {

        if (this._running)
        {
            if (this.usingSetTimeout)
            {
                this.root.clearTimeout(this._timeOutID);
            }
            else
            {
                this.root.cancelAnimationFrame(this._timeOutID);
            }

            this._running = false;
        }

    }

    normalizeRaf () {

        if (this.root.requestAnimationFrame)
        {
            return true;
        }
        else
        {
            for (let vendor of ['ms', 'moz', 'webkit', 'o'])
            {
                if (this.root[vendor] + 'RequestAnimationFrame')
                {
                    this.root.requestAnimationFrame = this.root[vendor] + 'RequestAnimationFrame';
                    this.root.cancelAnimationFrame = this.root[vendor] + 'CancelAnimationFrame';
                    return true;
                }
            }
        }

        return false;

    }

    get usingSetTimeout () {

        return this.forceSetTimeOut;

    }

    get usingRAF () {

        return !this.forceSetTimeOut;

    }

    get isRunning () {

        return this._running;

    }

    set isRunning (value) {

        if (value)
        {
            this.start();
        }
        else
        {
            this.stop();
        }

    }

}
