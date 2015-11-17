import WebGLContextOptions from 'webgl/ContextOptions.js';
import WebGLContextHandler from 'webgl/ContextHandler.js';
import WebGLGetContext from 'webgl/GetContext.js';

export default class WebGLMinimalRenderer {

    constructor (canvas) {

        this.contextOptions = WebGLContextOptions();
        this.contextHandler = new WebGLContextHandler();

        this.gl = null;

        if (canvas)
        {
            this.init(canvas);
        }

    }

    init (canvas) {

        this.contextHandler.add(canvas);

        this.gl = WebGLGetContext(canvas);

        if (!this.gl)
        {
            throw new Error('Browser does not support WebGL');
        }

    }

    render (color) {

        this.gl.clearColor(color.r1, color.g1, color.b1, color.a1);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    }

}