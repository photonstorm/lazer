import SignalBinding from 'system/SignalBinding.js';

export default class Signal {

    constructor () {

        this.callbacks = new Map();
        this.prevParams = [];
        this.memorize = false;
        this.active = true;
        this.propagate = true;

    }

    validate (listener, isOnce) {

        if (typeof listener !== 'function')
        {
            console.warn('Signal.add: listener argument is required and should be a Function.');
            return false;
        }

        //  Check we don't have any 'isOnce' Signals already bound
        for (let binding of this.callbacks.keys())
        {
            if (binding.listener === listener)
            {
                if (binding.isOnce)
                {
                    console.warn('Signal.add: You already have the given listener bound \'isOnce\' to this Signal.');
                    return false;
                }
                else if (isOnce)
                {
                    console.warn('Signal.addOnce: You cannot addOnce a listener that is already bound to this Signal.');
                    return false;
                }
            }
        }

        return true;

    }

    add (listener, ...args) {

        return this.register(listener, false, args);

    }

    addOnce (listener, ...args) {

        return this.register(listener, true, args);

    }

    register (listener, isOnce, args) {

        if (!this.validate(listener, false))
        {
            return null;
        }

        let binding = new SignalBinding(this, listener, false, args);

        this.callbacks.set(binding, listener);

        if (this.memorize && this.prevParams.length > 0)
        {
            binding.execute(this.prevParams);
        }

        return binding;

    }

    dispatch (...args) {

        if (this.memorize)
        {
            this.prevParams = args;
        }

        for (let binding of this.callbacks.keys())
        {
            let result = true;

            if (binding.active)
            {
                result = binding.execute(args);
            }

            if (!this.propagate || !result)
            {
                return;
            }
        }

    }

    remove (binding) {

        binding.destroy();

        this.callbacks.delete(binding);

    }

    removeAll () {

        for (let binding of this.callbacks.keys())
        {
            binding.destroy();
        }

        this.callbacks.clear();

    }

    halt () {

        this.propagate = false;

    }

    has (listener) {

        for (let binding of this.callbacks.keys())
        {
            if (binding.listener === listener)
            {
                return true;
            }
        }

        return false;

    }

    forget () {

        this.prevParams = [];

    }

    getNumListeners () {

        return this.callbacks.size;

    }

    destroy () {

        this.removeAll();
        this.forget();

        this.callbacks = null;

    }

}