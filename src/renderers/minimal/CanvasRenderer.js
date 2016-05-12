import CanvasGetContext from '../../canvas/GetContext.js';

export default class CanvasMinimalRenderer {

    constructor (canvas) {

        this.canvas = null;
        this.context = null;

        if (canvas)
        {
            this.init(canvas);
        }

    }

    init (canvas) {

        this.canvas = canvas;

        this.context = CanvasGetContext(canvas);

    }

    render (color) {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = color.rgba;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    }

}
