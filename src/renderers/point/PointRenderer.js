import Lazer from 'Lazer.js';
import CheckWebGL from 'device/features/WebGL.js';
import CanvasRenderer from 'renderers/point/CanvasRenderer.js';
import WebGLRenderer from 'renderers/point/WebGLRenderer.js';

export default class PointRenderer {

    constructor (canvas, type = Lazer.AUTO) {

        this.canvas = canvas;
        this.renderer = null;

        this.init(type);

    }

    init (type) {

        if ((type === Lazer.AUTO || type === Lazer.WEBGL) && CheckWebGL())
        {
            //  Create a WebGL renderer
            this.renderer = new WebGLRenderer(this.canvas);
            this.type = Lazer.WEBGL;
        }
        else
        {
            //  Create a Canvas renderer
            this.renderer = new CanvasRenderer(this.canvas);
            this.type = Lazer.CANVAS;
        }

    }

    update (x, y) {

        this.renderer.update(x, y);

    }

    render () {

        this.renderer.render();

    }

}
