import BaseFile from 'loader/types/BaseFile.js';

export default class TextFile extends BaseFile {

    constructor (loader, key, url = '', data = null) {

        if (url === '' && !data)
        {
            url = key + '.txt';
        }

        super(loader, key, url);

        this.type = 'text';

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

        console.log(this.data);

    }

}