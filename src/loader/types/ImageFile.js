import BaseFile from 'loader/types/BaseFile.js';

export default class ImageFile extends BaseFile {

    constructor (loader, key, url) {

        if (url === '')
        {
            url = key + '.png';
        }

        super(loader, key, url);

        this.customLoad = true;

    }

    load () {

        super.load();

        this.data = new window.Image();
        this.data.name = this.key;

        if (this.loader.crossOrigin)
        {
            this.data.crossOrigin = this.loader.crossOrigin;
        }

        this.data.onload = () => {
            if (this.data.onload)
            {
                this.data.onload = null;
                this.data.onerror = null;
                this.complete();
            }
        };

        this.data.onerror = (event) => {
            if (this.data.onload)
            {
                this.data.onload = null;
                this.data.onerror = null;
                this.error(event);
            }
        };

        this.data.src = this.src;

        // Image is immediately-available or cached

        if (this.data.complete && this.data.width && this.data.height)
        {
            this.data.onload = null;
            this.data.onerror = null;
            this.complete();
        }

    }

    error () {

        super.error();

    }

    complete () {

        super.complete();

    }

    process () {

        super.process();

        document.body.appendChild(this.data);

    }

}