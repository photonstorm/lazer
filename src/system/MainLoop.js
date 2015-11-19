import NOOP from 'system/NOOP.js';

export default class MainLoop {

    constructor (timestep = 1000 / 60) {

        this.timestep = timestep;

        this.frameDelta = 0;

        this.lastFrameTimeMs = 0;

        this.fps = 60;

        this.lastFpsUpdate = 0;

        this.framesThisSecond = 0;

        this.numUpdateSteps = 0;

        this.minFrameDelay = 0;

        this.running = false;
        this.started = false;
        this.panic = false;



        // A function that runs at the beginning of the main loop.
        // See `MainLoop.setBegin()` for details.
        this.begin = this.NOOP;

        // A function that runs updates (i.e. AI and physics).
        // See `MainLoop.setUpdate()` for details.
        this.update = this.NOOP;

        // A function that draws things on the screen.
        // See `MainLoop.setDraw()` for details.
        this.draw = this.NOOP;

        // A function that runs at the end of the main loop.
        // See `MainLoop.setEnd()` for details.
        this.end = this.NOOP;

        // The ID of the currently executing frame. Used to cancel frames when
        // stopping the loop.
        this.rafHandle;

    }

    get maxFPS () {

        return 1000 / this.minFrameDelay;

    }

    set maxFPS (fps = Infinity) {

        if (fps === 0)
        {
            this.stop();
        }
        else
        {
            this.minFrameDelay = 1000 / fps;
        }

    }

    resetFrameDelta () {

        var oldFrameDelta = this.frameDelta;

        this.frameDelta = 0;

        return oldFrameDelta;

    }

    start () {

        if (this.started)
        {
            return this;
        }

        this.started = true;



    }

    stop () {

        this.running = false;
        this.started = false;

        // cancelAnimationFrame(rafHandle);

        return this;

    }

    get isRunning () {

        return this.running;

    }
    
}