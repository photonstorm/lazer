export default class SignalBinding {

    constructor (signal, listener, isOnce = false, args = []) {

        this.signal = signal;

        this.listener = listener;

        this.isOnce = isOnce;

        this.args = args;

        this.active = true;

    }

    execute (args) {

        let result = this.listener.apply(null, args.concat(this.args));

        if (this.isOnce)
        {
            this.signal.remove(this);
        }

        return result;

    }

    destroy () {

        this.signal = null;
        this.listener = null;
        this.args = null;
        this.active = false;

    }

}