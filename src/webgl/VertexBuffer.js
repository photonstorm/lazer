export default class VertexBuffer {

    constructor (vertSize = 6, batchSize = 2000) {

        this.vertSize = vertSize;
        this.batchSize = batchSize;
        this.stride = vertSize * 4;

        this.vertices = new Float32Array(this.batchSize * 4 * this.vertSize);
        this.indices = new Uint16Array(this.batchSize * 6);

        this.vertexBuffer = null;
        this.indexBuffer = null;

    }

    resetIndices () {

        for (let i = 0, j = 0; i < (this.batchSize * 6); i += 6, j += 4)
        {
            this.indices[i + 0] = j + 0;
            this.indices[i + 1] = j + 1;
            this.indices[i + 2] = j + 2;
            this.indices[i + 3] = j + 0;
            this.indices[i + 4] = j + 2;
            this.indices[i + 5] = j + 3;
        }

    }

    create (gl) {

        this.vertexBuffer = gl.createBuffer();

        if (!vertexBuffer)
        {
            //  failed to create
            return -1;
        }

        this.indexBuffer = gl.createBuffer();

        if (!vertexBuffer)
        {
            //  failed to create
            return -1;
        }

        // 65535 is max index, so 65535 / 6 = 10922.

        //  Upload the index data
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);

    }

}