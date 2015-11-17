import Signal from 'system/Signal.js';

//  A SignalGroup is a collection of Signals.
//  A single entity can listen to a 'Group' and will receive all Signals belonging to that Group.
//  A side-effect of this is that you cannot have your own custom arguments in your callbacks.

export default class SignalGroup {

    constructor () {

        this.signals = new Set();

    }

    add (...args) {

        for (let arg of args)
        {
            this.signals.add(arg);
        }

    }

    //  Maybe should include a key? Otherwise your handler will have a tough time knowing which signal it's responding to.
    create () {

        let signal = new Signal();

        this.signals.add(signal);

        return signal;

    }

    remove (signal) {

        this.signals.delete(signal);

    }

    removeAll () {

        this.signals.clear();

    }

    listen (listener) {

        for (let signal of this.signals)
        {
            signal.add(listener);
        }

    }

}