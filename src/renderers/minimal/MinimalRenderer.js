import Lazer from 'Lazer.js';
import Color from 'graphics/color/BaseColor.js';
import CheckWebGL from 'device/features/WebGL.js';
import CanvasRenderer from 'renderers/minimal/CanvasRenderer.js';
import WebGLRenderer from 'renderers/minimal/WebGLRenderer.js';

export default class MinimalRenderer {

    constructor (canvas, type = Lazer.AUTO) {

        this.canvas = canvas;
        this.renderer = null;

        this.color = new Color();

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

    render (r = 0, g = 0, b = 0, a = 255) {

        this.color.fromRGB(r, g, b, a);

        this.renderer.render(this.color);

    }

}
