import RequestAnimationFrame from 'dom/RequestAnimationFrame.js';
import NOOP from 'system/NOOP.js';

//  My thanks to Isaac Sukin for some of the concepts used in this class

export default class MainLoop {

    constructor (framerate = 60) {

        //  Move to external file once tested
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

        this.timestep = 1000 / framerate;
        this.physicsStep = 1 / framerate;

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
        this.begin = NOOP;

        // A function that runs updates (i.e. AI and physics).
        // See `MainLoop.setUpdate()` for details.
        this.update = NOOP;

        // A function that draws things on the screen.
        // See `MainLoop.setDraw()` for details.
        this.draw = NOOP;

        // A function that runs at the end of the main loop.
        // See `MainLoop.setEnd()` for details.
        this.end = NOOP;

        this.raf = new RequestAnimationFrame(window, false);

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
        this.running = true;

        this.lastFrameTimeMs = this.getTime();
        this.lastFpsUpdate = this.getTime();
        this.framesThisSecond = 0;

        //  This starts RAF going automatically
        this.raf.start(now => this.step(now));

    }

    step (timestamp) {

        // console.log(timestamp);
        // debugger;

        // Throttle the frame rate (if minFrameDelay is set to a non-zero value by
        // `MainLoop.setMaxAllowedFPS()`).
        if (timestamp < this.lastFrameTimeMs + this.minFrameDelay)
        {
            // Run the loop again the next time the browser is ready to render.
            // rafHandle = requestAnimationFrame(animate);
            return;
        }

        // frameDelta is the cumulative amount of in-app time that hasn't been
        // simulated yet. Add the time since the last frame. We need to track total
        // not-yet-simulated time (as opposed to just the time elapsed since the
        // last frame) because not all actually elapsed time is guaranteed to be
        // simulated each frame. See the comments below for details.
        this.frameDelta += timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;

        // Run any updates that are not dependent on time in the simulation. See
        // `MainLoop.setBegin()` for additional details on how to use this.
        this.begin(timestamp, this.frameDelta);
        // this.begin(this.frameDelta);

        // Update the estimate of the frame rate, `fps`. Every second, the number
        // of frames that occurred in that second are included in an exponential
        // moving average of all frames per second, with an alpha of 0.25. This
        // means that more recent seconds affect the estimated frame rate more than
        // older seconds.
        if (timestamp > this.lastFpsUpdate + 1000)
        {
            // Compute the new exponential moving average with an alpha of 0.25.
            // Using constants inline is okay here.
            this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;

            this.lastFpsUpdate = timestamp;
            this.framesThisSecond = 0;
        }

        this.framesThisSecond++;

        this.numUpdateSteps = 0;

        while (this.frameDelta >= this.timestep)
        {
            this.update(this.timestep);

            this.frameDelta -= this.timestep;

            if (++this.numUpdateSteps >= 240)
            {
                this.panic = true;
                break;
            }
        }

        this.draw(this.frameDelta / this.timestep);

        // Run any updates that are not dependent on time in the simulation. See
        // `MainLoop.setEnd()` for additional details on how to use this.
        this.end(this.fps, this.panic);

        this.panic = false;

    }

    stop () {

        this.running = false;
        this.started = false;

        this.raf.stop();

        return this;

    }

    get isRunning () {

        return this.running;

    }
    
}