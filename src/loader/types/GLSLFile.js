import File, * as FILE from 'loader/File.js';

export default function GLSLFile (key, url = '', data = undefined) {

    if (url === '' && !data)
    {
        url = key + '.glsl';
    }

    let file = File(key, url, 'glsl');

    //  Set the expected XHR response type
    file.xhr.responseType = 'text';

    file.onLoad = function (xhr) {

        this.data = xhr.responseText;

        this.onStateChange(FILE.LOADED);

    };

    if (data)
    {
        file.data = data;
        file.onProcess();
    }

    return file;

}
