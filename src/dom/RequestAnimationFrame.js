import NOOP from 'system/NOOP.js';

export default class RequestAnimationFrame {

    constructor (root, forceSetTimeOut = false) {

        this.root = root;
        this.forceSetTimeOut = forceSetTimeOut;

        //  If there's no window object then we have to use ST anyway
        if (!window)
        {
            this.forceSetTimeOut = true;
        }
        else
        {
            this.normalizeRaf();
        }

        this._running = false;
        this._timeOutID = null;
        this._callback = NOOP;

    }

    //  Under SetTimeout callback must return the ms value of when to run the next update
    start (callback) {

        if (!this._running)
        {
            this._running = true;
            this._callback = callback;

            if (this.usingSetTimeout)
            {
                this._timeOutID = window.setTimeout(this.updateSetTimeout, 0);
            }
            else
            {
                this._timeOutID = window.requestAnimationFrame(this.updateRAF);
            }
        }

    }

    updateRAF (now) {

        this._callback(now);

        this._timeOutID = window.requestAnimationFrame(this.updateRAF);

    }

    updateSetTimeout () {

        const delay = this._callback(Date.now());

        this._timeOutID = window.setTimeout(this.updateSetTimeout, delay);

    }

    stop () {

        if (this._running)
        {
            if (this.usingSetTimeout)
            {
                clearTimeout(this._timeOutID);
            }
            else
            {
                window.cancelAnimationFrame(this._timeOutID);
            }

            this._running = false;
        }

    }

    normalizeRaf () {

        if (!this.root.requestAnimationFrame)
        {
            for (let vendor of ['ms', 'moz', 'webkit', 'o'])
            {
                if (this.root[vendor] + 'RequestAnimationFrame')
                {
                    this.root.requestAnimationFrame = this.root[vendor] + 'RequestAnimationFrame';
                    this.root.cancelAnimationFrame = this.root[vendor] + 'CancelAnimationFrame';
                }
            }
        }

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
