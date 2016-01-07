import XHRSettings from 'loader/XHRSettings.js';
import File, * as FILE from 'loader/File.js';

export const PENDING = 0;
export const LOADING = 1;
export const PROCESSING = 2;
export const COMPLETE = 3;
export const FAILED = 4;
export const DESTROYED = 5;

export default class BaseLoader {

    constructor () {

        this.baseURL = '';

        this.path = '';

        this.enableParallel = true;

        this.maxParallelDownloads = 4;

        //  xhr specific global settings (can be overridden on a per-file basis)
        this.xhr = XHRSettings();

        this.crossOrigin = undefined;

        this.list = new Set();
        this.queue = new Set();

        this.onStateChange = null;
        this._state = PENDING;

    }

    get state () {

        return this._state;

    }

    set state (value) {

        if (this._state !== value)
        {
            this._state = value;
            this.onStateChange(this);
        }

    }

    get loading () {

        return (this._state === LOADING);

    }

    addFile (file) {

        //  Multipart file?
        if (file.multipart)
        {
            file.fileA.path = this.path;
            file.fileB.path = this.path;

            this.list.add(file.fileA);
            this.list.add(file.fileB);
        }
        else
        {
            file.path = this.path;

            this.list.add(file);
        }

        return new Promise(
            (resolve, reject) => {

                //  When this file loads we need to call 'resolve'
                file.resolve = resolve;
                file.reject = reject;

            }
        );

    }

    start () {

        // console.log('BaseLoader start. Files to load:', this.list.size);

        if (this.loading)
        {
            return;
        }

        const promise = new Promise(
            (resolve, reject) => {
                this.onStateChange = function () {
                    if (this.state === COMPLETE)
                    {
                        resolve(this.getLoadedFiles(), this);
                    }
                    else if (this.state === FAILED)
                    {
                        reject(this);
                    }
                }
            }
        );

        if (this.list.size === 0)
        {
            this.finishedLoading();
        }
        else
        {
            this.state = LOADING;

            this.queue.clear();

            this.updateProgress();

            this.processLoadQueue();
        }

        return promise;

    }

    updateProgress () {

        //  TODO

    }

    processLoadQueue () {

        // console.log('BaseLoader processLoadQueue', this.list.size);

        if (!this.loading)
        {
            // console.warn('Lazer.Loader - active loading canceled / reset');
            this.finishedLoading(true);
            return;
        }

        for (let file of this.list)
        {
            if (file.state === FILE.PENDING && this.queue.size <= this.maxParallelDownloads)
            {
                this.queue.add(file);

                this.list.delete(file);

                this.loadFile(file);
            }

            if (this.queue.size === this.maxParallelDownloads)
            {
                break;
            }
        }

    }

    //  private
    loadFile (file) {

        file.src = this.getURL(file);

        // console.log('loadFile', file.src);

        //  If the file doesn't have its own crossOrigin set, we'll use the Loaders (which is undefined by default)
        if (file.crossOrigin === undefined && this.crossOrigin)
        {
            file.crossOrigin = this.crossOrigin;
        }

        //  The argument is an XHRSettings object
        file.load(this.xhr).then((file) => this.nextFile(file));

    }

    nextFile (previousFile) {

        // console.log('nextFile - previousFile was', previousFile.src);

        if (this.list.size > 0)
        {
            // console.log('nextFile - still something in the list, running processLoadQueue again');
            this.processLoadQueue();
        }
        else
        {
            //  Check the queue is clear
            for (let file of this.queue)
            {
                // console.log('Checking Queue');
                // console.log(file);

                if (file.state === FILE.LOADING)
                {
                    //  If anything is still loading we bail out
                    // console.log('nextFile - still something pending or loading, so bail out');
                    return;
                }
            }

            // console.log('nextFile calling finishedLoading');
            this.finishedLoading();
        }

    }

    getURL (file) {

        if (!file.url)
        {
            return false;
        }

        if (file.url.match(/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/))
        {
            return file.url;
        }
        else
        {
            return this.baseURL + file.path + file.url;
        }

    }
    
    finishedLoading () {

        // console.log('BaseLoader.finishedLoading PROCESSING');

        this.state = PROCESSING;

        //  This could be Promise based as well, allowing for async processing
        for (let file of this.queue)
        {
            file.onProcess();

            //  The File specific process handler has run
            //  Now run any custom callbacks
            if (file.processCallback)
            {
                file.processCallback(file);
            }

            file.onComplete();
        }

        // console.log('BaseLoader COMPLETE');

        this.state = COMPLETE;

    }

    getLoadedFiles (output = []) {

        //  Return an array of all files that have state = COMPLETE (which means loaded + processed)

        for (let file of this.queue)
        {
            if (file.state === FILE.COMPLETE)
            {
                output.push(file);
            }
        }

        return output;

    }

    destroy () {

        this.list.clear();
        this.queue.clear();

        this.state = DESTROYED;

    }

}
