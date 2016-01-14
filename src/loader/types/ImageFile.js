import File, * as FILE from 'loader/File.js';

export const TYPE = 'image';

export default function ImageFile (key, url = '', data = undefined) {

    if (url === '' && !data)
    {
        url = key + '.png';
    }

    let file = File(key, url, TYPE);

    file.load = function () {

        this.onStateChange(FILE.LOADING);

        this.data = new Image();

        if (this.crossOrigin)
        {
            this.data.crossOrigin = this.crossOrigin;
        }

        return new Promise(
            (resolve, reject) => {

                this.data.onload = () => {
                    if (this.data.onload)
                    {
                        this.data.onload = null;
                        this.data.onerror = null;
                        this.state = FILE.LOADED;
                        resolve(file);
                    }
                };

                this.data.onerror = (event) => {
                    if (this.data.onload)
                    {
                        this.data.onload = null;
                        this.data.onerror = null;
                        this.error = event;
                        this.state = FILE.FAILED;
                        reject(file);
                    }
                };

                this.data.name = key;
                this.data.src = this.src;

                // Image is immediately-available or cached

                if (this.data.complete && this.data.width && this.data.height)
                {
                    this.data.onload = null;
                    this.data.onerror = null;
                    this.state = FILE.LOADED;
                    resolve(file);
                }

            }
        );

    };

    return file;

}
