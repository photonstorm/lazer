import WebGLGetContext from '../../webgl/GetContext.js';

export default function WebGL() {

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
