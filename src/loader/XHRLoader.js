import MergeXHRSettings from './MergeXHRSettings.js';

export default function XHRLoader (file, globalXHRSettings) {

    let config = MergeXHRSettings(globalXHRSettings, file.xhr);

    let xhr = new XMLHttpRequest();

    xhr.open('GET', file.src, config.async, config.user, config.password);

    xhr.responseType = file.xhr.responseType;
    xhr.timeout = config.timeout;

    if (config.header && config.headerValue)
    {
        xhr.setRequestHeader(config.header, config.headerValue);
    }

    if (config.overrideMimeType)
    {
        xhr.overrideMimeType(config.overrideMimeType);
    }

    return new Promise(
        (resolve, reject) => {

            xhr.onload = () => {
                file.onLoad(xhr);
                resolve(file);
            };

            xhr.onerror = () => {
                file.onError(xhr);
                reject(file);
            };

            xhr.send();

        }
    );

}
