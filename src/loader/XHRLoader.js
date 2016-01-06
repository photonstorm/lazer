import { FILE } from 'loader/Constants.js';

export default function XHRLoader (file) {

    console.log('XHRLoader', file);

    file.state = FILE.LOADING;

    let xhr = new XMLHttpRequest();

    xhr.open('GET', file.src, true, file.user, file.password);

    xhr.responseType = file.type;
    xhr.timeout = file.timeout;

    if (file.header !== '')
    {
        xhr.setRequestHeader(file.header, file.headerValue);
    }

    if (file.overrideMimeType !== '')
    {
        xhr.overrideMimeType(file.overrideMimeType);
    }

    return new Promise(
        (resolve, reject) => {

            xhr.onload = () => {
                file.state = FILE.LOADED;
                file.onComplete(xhr);
                resolve(file);
            };

            xhr.onerror = () => {
                file.state = FILE.FAILED;
                file.onError(xhr);
                reject(file);
            };

            xhr.send();

        }
    );

}
