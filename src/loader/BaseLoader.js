import XHRLoader from 'loader/XHRLoader.js';
import TagLoader from 'loader/TagLoader.js';
import { LOADER, FILE } from 'loader/Constants.js';

export default class BaseLoader {

    constructor () {

        this.resetLocked = false; // for state changes, probably not needed any more

        this.crossOrigin = false;
    
        this.baseURL = '';

        this.path = '';

        this.enableParallel = true;

        this.maxParallelDownloads = 4;

        this.list = new Set();
        this.queue = new Set();

        this.onStateChange = null;
        this._state = 0;

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

        return (this._state === LOADER.LOADING);

    }

    addFile (file) {

        if (!this.list.has(file))
        {
            file.path = this.path;
            this.list.add(file);
        }

    }

    start () {

        console.log('BaseLoader start', this.list.size);

        if (this.loading)
        {
            return;
        }

        const promise = new Promise(
            (resolve, reject) => {
                this.onStateChange = function () {
                    if (this.state === LOADER.COMPLETE)
                    {
                        resolve(this);
                    }
                    else if (this.state == LOADER.FAILED)
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
            this.state = LOADER.LOADING;

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

        console.log('BaseLoader processLoadQueue', this.list.size);

        if (!this.loading)
        {
            console.warn('Lazer.Loader - active loading canceled / reset');
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

    loadFile (file) {

        file.src = this.getURL(file);

        console.log('BaseLoader loadFile', file.src);

        if (file.loader === 'xhr')
        {
            XHRLoader(file).then(() => this.nextFile());
        }
        else if (file.loader === 'tag')
        {
            TagLoader(file).then(() => this.nextFile());
        }
        else if (file.loader === 'custom')
        {
            file.customLoader().then(() => this.nextFile());
        }

    }

    nextFile () {

        console.log('nextFile');

        if (this.list.size > 0)
        {
            this.processLoadQueue();
        }
        else
        {
            //  Check the queue is clear
            for (let file of this.queue)
            {
                if (file.state === FILE.LOADING)
                {
                    //  If anything is still loading we bail out
                    return;
                }
            }

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

        console.log('BaseLoader PROCESSING');

        this.state = LOADER.PROCESSING;

        for (let file of this.queue)
        {
            if (file.parent)
            {
                file.parent.onProcess();
            }
            else
            {
                file.onProcess();
            }
        }

        console.log('BaseLoader COMPLETE');

        this.state = LOADER.COMPLETE;

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

        this.state = LOADER.DESTROYED;

    }

}
