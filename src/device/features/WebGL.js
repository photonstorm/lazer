import WebGLGetContext from 'webgl/GetContext.js';

export default function () {

    try {
        let canvas = document.createElement('canvas');

        if (WebGLGetContext(canvas) === null)
        {
            return false;
        }
    }
    catch (error)
    {
        return false;
    }

    return true;

}
