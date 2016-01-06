import { FILE } from 'loader/Constants.js';

//  Our base File object (from which all File Types extend)

export default function File (key, url, type, loader = 'xhr') {

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

        type: type, // the file type, i.e. 'image', 'json', etc (can control which cache it gets added to)

        state: FILE.PENDING,

        loader: loader,
        customLoader: undefined,

        parent: undefined,

        linkFile: undefined,

        data: undefined,

        //  xhr credentials
        user: '',
        password: '',

        //  xhr timeout in ms (0 = no timeout)
        timeout: 0,

        //  xhr setRequestHeader
        header: '',
        headerValue: '',

        //  xhr overrideMimeType
        overrideMimeType: '',

        //  These functions are overwritten by the custom file types

        onLoad: function () {

            this.state = FILE.LOADED;

        },

        onError: function () {

            this.state = FILE.FAILED;

        },

        onProcess: function () {

            this.state = FILE.COMPLETE;

        }

    };

}
