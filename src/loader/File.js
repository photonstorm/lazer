import XHRLoader from 'loader/XHRLoader.js';
import XHRSettings from 'loader/XHRSettings.js';

//  File level consts

export const PENDING = 0;      // file is in the load queue but not yet started
export const LOADING = 1;      // file has been started to load by the loader (onLoad called)
export const LOADED = 2;       // file has loaded successfully, awaiting processing
export const FAILED = 3;       // file failed to load
export const PROCESSING = 4;   // file is being processed (onProcess callback)
export const COMPLETE = 5;     // file has finished processing
export const DESTROYED = 6;    // file has been destroyed

//  Our base File object (from which all File Types extend)

//  key = user level file key (can be filename or other string based value)
//  url = the URL to load the file from, doesn't include baseURL or Path (which are both set by the Loader)
//  type = a user-level value that can control which cache the file is added to

export default function File (key, url, type) {

    if (!key)
    {
        console.warn('Invalid File key');
        return;
    }

    return {

        key: key,

        url: url,

        //  Both of these are set by the BaseLoader
        path: '',
        src: '',

        type: type, // the file type, i.e. 'image', 'json', etc which can be used to control which cache it gets added to

        state: PENDING,

        parent: undefined,

        linkFile: undefined,

        data: undefined,

        //  For CORs based loading.
        //  If this is undefined then the File will check BaseLoader.crossOrigin and use that (if set)
        crossOrigin: undefined,

        //  Optionally set by the Promise returned from BaseLoader.addFile.
        resolve: undefined,
        reject: undefined,

        //  maybe you have to set it in the Promise?
        processCallback: undefined,

        //  xhr specific settings (ignored by TagLoaded files)
        xhr: XHRSettings('text'),

        onStateChange: function (value) {

            if (this.state !== value)
            {
                this.state = value;

                if (value === LOADED && this.resolve)
                {
                    this.resolve(this);
                }
                else if (value === FAILED && this.reject)
                {
                    this.reject(this);
                }
            }

        },

        //  These functions are usually overridden by the custom file types

        load: function (loader) {

            this.onStateChange(LOADING);

            //  Returns a Promise from the XHRLoader
            return XHRLoader(this, loader);

        },

        onLoad: function () {

            //  If overridden it must set `state` to LOADED
            this.onStateChange(LOADED);

        },

        onError: function () {

            //  If overridden it must set `state` to FAILED
            this.onStateChange(FAILED);

        },

        onProcess: function () {

            //  If overridden it must set `state` to PROCESSING
            this.onStateChange(PROCESSING);

        },

        onComplete: function () {

            //  If overridden it must set `state` to COMPLETE
            this.onStateChange(COMPLETE);

        },

        onDestroy: function () {

            //  If overridden it must set `state` to DESTROYED
            this.onStateChange(DESTROYED);

        }

    };

}
