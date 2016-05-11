import ParseXML from '../../system/ParseXML.js';
import File, * as FILE from '../File.js';

export const TYPE = 'xml';

export default function XMLFile (key, url = '', data = undefined) {

    if (url === '' && !data)
    {
        url = key + '.xml';
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

        let xml = ParseXML(this.data);

        if (!xml)
        {
            throw new Error('XMLFile: Invalid XML');
        }
        else
        {
            this.data = xml;
        }

    };

    if (data)
    {
        file.data = data;
        file.onProcess();
    }

    return file;

}
