import Frame from 'texture/Frame.js';

export default class FrameSet {

    constructor () {

        this.frames = new Map();
        
    }

    //  This allows you to iterate over the FrameSet and get all of the Frames back
    [Symbol.iterator]() {
        return this.frames[Symbol.iterator]();
    }

    //  Frame object
    add (frame) {

        this.frames.set(frame.name, frame);

    }

    get (name) {

        return this.frames.get(name);

    }
    
}