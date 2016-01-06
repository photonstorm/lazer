
export default class BaseFile {

    constructor (loader, key, url, data) {

        this.loader = loader;

        if (key === undefined || key === '')
        {
            console.warn('Lazer.Loader: Invalid key given');
            return this;
        }

        this.key = key;

        this.path = loader.path;

        this.url = url;

        this.src = '';

        this.type = '';

        //  xhr credentials
        this.user = '';
        this.password = '';
        //  xhr timeout (0 = no timeout)
        this.timeout = 0;
        //  setRequestHeader
        this.header = '';
        this.headerValue = '';
        //  overrideMimeType
        this.overrideMimeType = '';

        this.parent = null;

        this.linkFile = null;

        this.data = null;

        this.onStateChange = null;

        this.customLoad = false;

        this._state = 0;

    }

    link (parent, file) {

        if (this.linkFile)
        {
            return;
        }

        this.parent = parent;

        this.linkFile = file;

        file.link(parent, this);

    }

    /*
    add () {

        //  It's a Set so it won't allow multiple identical objects
        this.loader.list.add(this);

        return new Promise(
            (resolve, reject) => {
                this.onStateChange = function () {
                    if (this.state === BaseFile.LOADED)
                    {
                        resolve(this);
                    }
                    else if (this.state == BaseFile.FAILED)
                    {
                        reject(this);
                    }
                }
            }
        );

    }
    */

    load (src) {

        this.src = src;

        // this.src = this.loader.getURL(this);

        if (!this.customLoad)
        {
            this.loader.xhrLoad(this);
        }

        this.state = BaseFile.LOADING;

    }

    complete (data = null) {

        if (data)
        {
            this.data = data;
        }

        this.state = BaseFile.LOADED;

        this.loader.nextFile();

    }

    error () {

        this.state = BaseFile.FAILED;

        this.loader.nextFile();

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

        return (this._state === BaseFile.LOADING);

    }

    //  Add to cache, etc
    process () {

        console.log('BaseFile.process', this.src);

    }

    destroy () {

        this.loader = null;
        this.parent = null;
        this.linkFile = null;
        this.data = null;

        this.state = BaseFile.DESTROYED;

    }
    
}

//  Class constants (because ES6 won't let us do it within the Class yet)

BaseFile.PENDING = 0;
BaseFile.LOADING = 1;
BaseFile.LOADED = 2;
BaseFile.FAILED = 3;
BaseFile.DESTROYED = 4;
