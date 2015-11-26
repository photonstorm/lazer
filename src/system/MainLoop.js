import NOOP from 'system/NOOP.js';

export default class MainLoop {

    constructor (timestep = 1000 / 60) {

        this.timestep = timestep;

    // The cumulative amount of in-app time that hasn't been simulated yet.
    // See the comments inside animate() for details.
        this.frameDelta = 0;

    // The timestamp in milliseconds of the last time the main loop was run.
    // Used to compute the time elapsed between frames.
        this.lastFrameTimeMs = 0;

    // An exponential moving average of the frames per second.
        this.fps = 60;

    // The timestamp (in milliseconds) of the last time the `fps` moving
    // average was updated.
        this.lastFpsUpdate = 0;

    // The number of frames delivered in the current second.
        this.framesThisSecond = 0;

    // The number of times update() is called in a given frame. This is only
    // relevant inside of animate(), but a reference is held externally so that
    // this variable is not marked for garbage collection every time the main
    // loop runs.
        this.numUpdateSteps = 0;

    // The minimum amount of time in milliseconds that must pass since the last
    // frame was executed before another frame can be executed. The
    // multiplicative inverse caps the FPS (the default of zero means there is
    // no cap).
        this.minFrameDelay = 0;

    // Whether the main loop is running.
        this.running = false;

    // `true` if `MainLoop.start()` has been called and the most recent time it
    // was called has not been followed by a call to `MainLoop.stop()`. This is
    // different than `running` because there is a delay of a few milliseconds
    // after `MainLoop.start()` is called before the application is considered
    // "running." This delay is due to waiting for the next frame.
        this.started = false;

    // Whether the simulation has fallen too far behind real time.
    // Specifically, `panic` will be set to `true` if too many updates occur in
    // one frame. This is only relevant inside of animate(), but a reference is
    // held externally so that this variable is not marked for garbage
    // collection every time the main loop runs.
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

        let oldFrameDelta = this.frameDelta;

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