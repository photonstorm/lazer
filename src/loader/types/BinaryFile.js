import BaseFile from 'loader/types/BaseFile.js';

export default class BinaryFile extends BaseFile {

    constructor (loader, key, url = '', callback = null) {

        if (url === '')
        {
            url = key + '.bin';
        }

        super(loader, key, url);

        this.type = 'arraybuffer';

        this.callback = callback;

    }

    complete (xhr) {

        super.complete(xhr.response);

    }

    process () {

        super.process();

        if (this.callback)
        {
            //  scope check
            this.data = this.callback(this.key, this.data);
        }

    }

}