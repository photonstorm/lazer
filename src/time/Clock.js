export default class Clock {

    constructor (masterClock, tickSize = 0) {

        this.master = masterClock;

        this.tickSize = tickSize;

        this.total = 0;

        this.time = 0;

        this.scale = 1;

        this.callback = null;

        this.events = new Set();

    }

    step (elapsed) {

        //  This is called every time the MasterClock updates
        //  the 'elapsed' value being the amount of microseconds that passed

        this.total += elapsed;

        if (this.total >= (this.tickSize * this.scale))
        {
            //  Store the remainder
            const remainder = this.total % (this.tickSize * this.scale);

            this.time++;

            // this.callback();

            this.total = remainder;
        }

    }

}