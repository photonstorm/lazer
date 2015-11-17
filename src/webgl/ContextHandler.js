export default class WebGLContextHandler {

    constructor (canvas) {

        this.canvas = null;
        this.contextLost = false;

        if (canvas)
        {
            this.add(canvas);
        }

    }

    add (canvas) {

        if (this.canvas)
        {
            this.remove();
        }

        this.canvas = canvas;

        this.canvas.addEventListener('webglcontextlost', this.lost, false);
        this.canvas.addEventListener('webglcontextrestored', this.restored, false);

    }

    lost (event) {

        console.log('WebGL Context Lost');

        event.preventDefault();

        this.contextLost = true;

    }

    restored () {

        console.log('WebGL Context restored');

        this.contextLost = false;

        // empty all the old gl textures as they are useless now

    }

    remove () {

        this.canvas.removeEventListener('webglcontextlost', this.lost);
        this.canvas.removeEventListener('webglcontextrestored', this.restored);

        this.canvas = null;

    }

}
