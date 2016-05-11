import File, * as FILE from '../File.js';

export const TYPE = 'binary';

export default function BinaryFile (key, url = '', data = undefined) {

    if (url === '' && !data)
    {
        url = key + '.bin';
    }

    let file = File(key, url, TYPE);

    //  Set the expected XHR response type
    file.xhr.responseType = 'arraybuffer';

    file.onLoad = function (xhr) {

        this.data = xhr.response;

        this.onStateChange(FILE.LOADED);

    };

    if (data)
    {
        file.data = data;
        file.onProcess();
    }

    return file;

}
