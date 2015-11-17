import CanvasGetContext from 'canvas/GetContext.js';

export default class CanvasPointRenderer {

    constructor (canvas) {

        this.canvas = null;
        this.context = null;

        this.x = 0;
        this.y = 0;
        this.size = 32;

        if (canvas)
        {
            this.init(canvas);
        }

    }

    init (canvas) {

        this.canvas = canvas;

        this.context = CanvasGetContext(canvas);

    }

    update (x, y) {

        this.x = x;
        this.y = y;

    }

    render () {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = '#ffff00';
        this.context.fillRect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size);

    }

}
