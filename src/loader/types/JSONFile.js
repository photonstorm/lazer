import File, * as FILE from 'loader/File.js';

export const TYPE = 'json';

export default function JSONFile (key, url = '', data = undefined) {

    if (url === '' && !data)
    {
        url = key + '.json';
    }

    let file = File(key, url, TYPE);

    //  Set the expected XHR response type
    file.xhr.responseType = 'text';

    file.onLoad = function (xhr) {

        this.data = xhr.responseText;

        this.onStateChange(FILE.LOADED);

    };

    file.onProcess = function () {

        this.onStateChange(FILE.PROCESSING);

        this.data = JSON.parse(this.data);

    };

    if (data)
    {
        file.data = data;
        file.onProcess();
    }

    return file;

}
