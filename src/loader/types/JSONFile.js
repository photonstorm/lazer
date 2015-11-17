import BaseFile from 'loader/types/BaseFile.js';

export default class JSONFile extends BaseFile {

    constructor (loader, key, url = '', data = null) {

        if (url === '' && !data)
        {
            url = key + '.json';
        }

        super(loader, key, url);

        this.type = 'text';

        this.json = null;

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

        //  try / catch?
        this.json = JSON.parse(this.data);

        console.log(this.json);

    }

}