import BaseFile from 'loader/types/BaseFile.js';
import ParseXML from 'system/ParseXML.js';

export default class XMLFile extends BaseFile {

    constructor (loader, key, url = '', data = null) {

        if (url === '' && !data)
        {
            url = key + '.xml';
        }

        super(loader, key, url);

        this.type = 'text';

        this.xml = null;

        if (data)
        {
            //  Already loaded!
            this.data = data;
        }

    }

    complete (xhr) {

        super.complete(xhr.responseText);

    }

    process () {

        super.process();

        this.xml = ParseXML(this.data);

        if (!this.xml)
        {
            throw new Error('Lazer.Loader.XMLFile: Invalid XML');
        }

        console.log(this.xml);

    }

}