
export default class BaseLoader {

    constructor (game) {

        this.game = game;

        this.resetLocked = false;

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

        return (this._state === BaseLoader.LOADING);

    }

    start () {

        if (this.loading)
        {
            return;
        }

        const promise = new Promise(
            (resolve, reject) => {
                this.onStateChange = function () {
                    if (this.state === BaseLoader.COMPLETE)
                    {
                        resolve(this);
                    }
                    else if (this.state == BaseLoader.FAILED)
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
            this.state = BaseLoader.LOADING;

            this.queue.clear();

            // this.updateProgress();

            this.processLoadQueue();
        }

        return promise;

    }

    processLoadQueue () {

        if (!this.loading)
        {
            console.warn('Lazer.Loader - active loading canceled / reset');
            this.finishedLoading(true);
            return;
        }

        for (let file of this.list)
        {
            if (!file.loading && this.queue.size <= this.maxParallelDownloads)
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

        file.load();

    }

    nextFile () {

        if (this.list.size > 0)
        {
            this.processLoadQueue();
        }
        else
        {
            //  Check the queue is clear
            for (let file of this.queue)
            {
                if (file.loading)
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

        console.log('finishedLoading, about to start processing');

        this.state = BaseLoader.PROCESSING;

        for (let file of this.queue)
        {
            if (file.parent)
            {
                file.parent.process();
            }
            else
            {
                file.process();
            }
        }

        this.state = BaseLoader.COMPLETE;

    }

    xhrLoad (file) {

        console.log('xhrLoad', file.src);

        let xhr = new XMLHttpRequest();
        xhr.open('GET', file.src, true);
        xhr.responseType = file.type;

        xhr.onload = () => {
            file.complete(xhr);
        };

        xhr.onerror = () => {
            file.error(xhr);
        };

        xhr.send();

    }

    destroy () {

        this.list.clear();
        this.queue.clear();

        this.state = BaseLoader.DESTROYED;

    }

}

//  Class constants

BaseLoader.PENDING = 0;
BaseLoader.LOADING = 1;
BaseLoader.PROCESSING = 2;
BaseLoader.COMPLETE = 3;
BaseLoader.FAILED = 4;
BaseLoader.DESTROYED = 5;
