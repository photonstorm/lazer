import File from 'loader/File.js';
import { FILE } from 'loader/Constants.js';

export default function JSONFile (key, url = '', data = undefined) {

    if (url === '' && !data)
    {
        url = key + '.json';
    }

    let file = File(key, url, 'text');

    file.onLoad = function (xhr) {

        this.state = FILE.LOADED;
        this.data = xhr.responseText;

    };

    file.onProcess = function () {

        //  try/catch?
        this.data = JSON.parse(this.data);

        console.log(this.data);

        this.state = FILE.COMPLETE;

    };

    if (data)
    {
        file.data = data;
        file.onProcess();
    }

    return file;

}
