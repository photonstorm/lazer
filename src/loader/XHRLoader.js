
export default function XHRLoader (file, loader) {

    let async = file.xhr.async ? file.xhr.async : loader.xhr.async;
    let user = file.xhr.user ? file.xhr.user : loader.xhr.user;
    let password = file.xhr.password ? file.xhr.password : loader.xhr.password;
    let header = file.xhr.header ? file.xhr.header : loader.xhr.header;
    let headerValue = file.xhr.headerValue ? file.xhr.headerValue : loader.xhr.headerValue;
    let overrideMimeType = file.xhr.overrideMimeType ? file.xhr.overrideMimeType : loader.xhr.overrideMimeType;

    let xhr = new XMLHttpRequest();

    xhr.open('GET', file.src, async, user, password);

    xhr.responseType = file.xhr.responseType;
    xhr.timeout = file.xhr.timeout ? file.xhr.timeout : loader.xhr.timeout;

    if (header && headerValue)
    {
        xhr.setRequestHeader(header, headerValue);
    }

    if (overrideMimeType)
    {
        xhr.overrideMimeType(overrideMimeType);
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
