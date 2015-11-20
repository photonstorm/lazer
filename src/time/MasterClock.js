import RequestAnimationFrame from 'dom/RequestAnimationFrame.js';
import Clock from 'time/Clock.js';

//  This can implement RAF itself, so it can be the heart of the Game.
//  Then GameClock objects will use this data to run from, including their
//  own stepping rate, slow motion, etc. Each State can have its own GameClock instance,
//  updating at whatever rate it requires.

//  There should be only one MasterClock per Game instance

export default class MasterClock {

    constructor () {

        this.raf = new RequestAnimationFrame(window, false);

        //  This needs normalising with perf now in the step loop
        this.getTime = Date.now;

        if (window.performance)
        {
            if (window.performance.now)
            {
                this.getTime = () => { return window.performance.now() };
            }
            else if (window.performance.webkitNow)
            {
                this.getTime = () => { return window.performance.webkitNow() };
            }
        }

        /**
        * The `performance.now()` value when the time was last updated.
        * @property {float} time
        * @protected
        */
        this.time = 0;

        /**
        * The `now` when the previous update occurred.
        * @property {float} prevTime
        * @protected
        */
        this.prevTime = 0;

        /**
        * Elapsed time since the last time update, in milliseconds, based on `now`.
        *
        * This value _may_ include time that the game is paused/inactive.
        *
        * _Note:_ This is updated only once per game loop - even if multiple logic update steps are done.
        * Use {@link Lazer.Timer#physicsTime physicsTime} as a basis of game/logic calculations instead.
        *
        * @property {number} elapsed
        * @see Lazer.Time.time
        * @protected
        */
        this.elapsed = 0;

        this._startTime = 0;

        this.callback = null;

        this.clocks = new Set();

    }

    init (callback) {

        this.time = this.getTime();

        this._startTime = this.time;

        this.callback = callback;

        //  This starts RAF going automatically
        this.raf.start(now => this.step(now));

    }

    //  this.raf provides performance.now as an argument (or Date.now under SetTimeout)
    step (now) {

        this.prevTime = this.time;

        this.time = now;

        this.elapsed = this.time - this.prevTime;

        for (const clock of this.clocks)
        {
            clock.step(this.elapsed);
        }

        this.callback();

        //  For SetTimeout RAF
        return 16;

    }

    add (tickSize = 0) {

        let clock = new Clock(this, tickSize);

        this.clocks.add(clock);

        return clock;

    }

    remove (clock) {

        this.clocks.delete(clock);

    }

    destroy () {

    }

    get totalElapsed () {

        return this.time - this._startTime;

    }

}