import Frame from 'texture/Frame.js';

export default class FrameSet {

    //  A name for the FrameSet (should usually be unique, from a Cache point of view)
    constructor (name) {

        this.name = name;
        this.frames = new Map();
        
    }

    //  This allows you to iterate over the FrameSet and get all of the Frames back
    [Symbol.iterator]() {
        return this.frames[Symbol.iterator]();
    }

    //  Frame object
    add (frame) {

        frame.frameSet = this;

        this.frames.set(frame.name, frame);

    }

    get (name) {

        return this.frames.get(name);

    }
    
}