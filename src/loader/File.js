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

        type: type,

        loader: loader,

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

        parent: null,

        linkFile: null,

        data: null,

        state: FILE.PENDING,

        get isLoading () {
            return (this.state === FILE.LOADING);
        }

    };

}
