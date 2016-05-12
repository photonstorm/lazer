import WebGLContextHandler from '../../webgl/ContextHandler.js';
import WebGLContextOptions from '../../webgl/ContextOptions.js';
import WebGLGetContext from '../../webgl/GetContext.js';

export default class WebGLNano {

    constructor (width = 800, height = 600, canvas = null) {

        this.width = width;
        this.height = height;
        this.projection = { x: 0, y: 0 };

        this.contextOptions = new WebGLContextOptions();
        this.contextHandler = new WebGLContextHandler();

        this.gl = null;

        if (canvas)
        {
            this.init(width, height, canvas);
        }

    }

    init (width, height, canvas) {

        this.contextHandler.add(canvas);

        this.gl = WebGLGetContext(canvas);

        if (!this.gl)
        {
            throw new Error('Browser does not support WebGL');
        }

        this.gl.id = 0;

        this.gl.disable(gl.DEPTH_TEST);
        this.gl.disable(gl.CULL_FACE);
        this.gl.enable(gl.BLEND);

        this.gl.viewport(0, 0, this.width, this.height);

        this.projection.x = this.width / 2;
        this.projection.y = -this.height / 2;

    }

}