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

        this.tag = '';

        this.enableParallel = true;

        this.maxParallelDownloads = 4;

        //  xhr specific global settings (can be overridden on a per-file basis)
        this.xhr = XHRSettings();

        this.crossOrigin = undefined;

        this.list = new Set();
        this.inflight = new Set();
        this.failed = new Set();
        this.queue = new Set();
        this.storage = new Set();

        this._state = PENDING;
        this._resolve = undefined;
        this._reject = undefined;

    }

    get state () {

        return this._state;

    }

    set state (value) {

        if (this._state !== value)
        {
            this._state = value;

            if (value === COMPLETE && this._resolve)
            {
                this._resolve(this.getLoadedFiles(), this);
            }
            else if (value === FAILED && this._reject)
            {
                this._reject(this);
            }
        }

    }

    //  Is the Loader actively loading (or processing loaded files)
    get isLoading () {

        return (this._state === LOADING || this._state === PROCESSING);

    }

    //  Is the Loader ready to start a new load?
    get isReady () {

        return (this._state === PENDING || this._state === COMPLETE || this._state === FAILED);

    }

    startFileGroup (name) {

        this.tag = name;

    }

    stopFileGroup () {

        this.tag = '';

    }

    addFile (file) {

        if (!this.isReady)
        {
            return -1;
        }

        //  Multipart file?
        if (file.multipart)
        {
            file.fileA.path = this.path;
            file.fileB.path = this.path;

            file.fileA.tag = this.tag;
            file.fileB.tag = this.tag;

            this.list.add(file.fileA);
            this.list.add(file.fileB);
        }
        else
        {
            file.path = this.path;
            file.tag = this.tag;

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

        if (!this.isReady)
        {
            return;
        }

        if (this.list.size === 0)
        {
            this.finishedLoading();
        }
        else
        {
            this.state = LOADING;

            this.failed.clear();
            this.inflight.clear();
            this.queue.clear();

            this.updateProgress();

            this.processLoadQueue();
        }

        return new Promise(
            (resolve, reject) => {
                this._resolve = resolve;
                this._reject = reject;
            }
        );

    }

    updateProgress () {

        //  TODO

    }

    processLoadQueue () {

        // console.log('BaseLoader processLoadQueue', this.list.size);

        for (let file of this.list)
        {
            if (file.state === FILE.PENDING && this.inflight.size < this.maxParallelDownloads)
            {
                // console.log('ADDED TO QUEUE:', file.src);

                this.inflight.add(file);

                this.list.delete(file);

                this.loadFile(file);
            }

            if (this.inflight.size === this.maxParallelDownloads)
            {
                break;
            }
        }

    }

    //  private
    loadFile (file) {

        file.src = this.getURL(file);

        // console.log('LOADING', file.src);

        //  If the file doesn't have its own crossOrigin set, we'll use the Loaders (which is undefined by default)
        if (file.crossOrigin === undefined && this.crossOrigin)
        {
            file.crossOrigin = this.crossOrigin;
        }

        //  The argument is an XHRSettings object
        file.load(this.xhr)
            .then(file => this.nextFile(file, true))
            .catch(file => this.nextFile(file, false));

    }

    nextFile (previousFile, success) {

        // console.log('LOADED:', previousFile.src, success);

        //  Move the file that just loaded from the inflight list to the queue or failed Set

        if (success)
        {
            this.queue.add(previousFile);
        }
        else
        {
            this.failed.add(previousFile);
        }

        this.inflight.delete(previousFile);

        if (this.list.size > 0)
        {
            // console.log('nextFile - still something in the list');
            this.processLoadQueue();
        }
        else if (this.inflight.size === 0)
        {
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

        this.storage.clear();

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

            this.storage.add(file);
        }

        this.list.clear();
        this.inflight.clear();
        this.queue.clear();

        console.log('Loader Complete. Loaded:', this.storage.size, 'Failed:', this.failed.size);

        // console.log('BaseLoader COMPLETE');

        this.state = COMPLETE;

    }

    getLoadedFiles (group = '', output = []) {

        //  Return an array of all files that have state = COMPLETE (which means loaded + processed)

        for (let file of this.storage)
        {
            if (file.state === FILE.COMPLETE && file.tag === group)
            {
                output.push(file);
            }
        }

        return output;

    }

    reset () {

        this.list.clear();
        this.inflight.clear();
        this.failed.clear();
        this.queue.clear();
        this.storage.clear();

        this.tag = '';
        this.path = '';
        this.baseURL = '';

        this.state = PENDING;

    }

    destroy () {

        this.reset();
        this.state = DESTROYED;

    }

}
