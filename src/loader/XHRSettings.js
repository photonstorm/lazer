//  Creates an XHRSettings Object

export default function XHRSettings (responseType = '') {

    return {

        //  Ignored by the Loader, only used by File.
        responseType: responseType,

        async: undefined,

        //  credentials
        user: undefined,
        password: undefined,

        //  timeout in ms (0 = no timeout)
        timeout: undefined,

        //  setRequestHeader
        header: undefined,
        headerValue: undefined,

        //  overrideMimeType
        overrideMimeType: undefined

    };
    
}