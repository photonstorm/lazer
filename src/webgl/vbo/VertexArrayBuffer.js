export default class VertexArrayBuffer {

    constructor () {

        this.vertSize = 0;
        this.batchSize = 0;

        this.vertices = null;
        this.buffer = null;

        this.index = 0;
        this.total = 0;
        this.size = 0;

    }

    create (gl, vertSize = 2, batchSize = 2000) {

        this.vertSize = vertSize;
        this.batchSize = batchSize;

        this.vertices = new Float32Array(this.batchSize * this.vertSize);

        this.index = 0;
        this.total = 0;
        this.size = 0;

        this.buffer = gl.createBuffer();

        if (!this.buffer)
        {
            return -1;
        }

        this.bindBuffer(gl);

    }

    bindBuffer (gl) {

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

    }

    //  usage = gl.DYNAMIC_DRAW, gl.STATIC_DRAW or gl.STREAM_DRAW
    bufferData (gl, usage) {

        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, usage);

    }

    bufferDynamicData (gl) {

        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);

    }

    bufferStaticData (gl) {

        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

    }

    bufferStreamData (gl) {

        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STREAM_DRAW);

    }

    reset () {

        this.index = 0;
        this.size = 0;

    }

}
