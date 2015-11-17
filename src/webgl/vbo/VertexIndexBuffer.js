export default class VertexIndexBuffer {

    constructor () {

        this.vertSize = 0;
        this.batchSize = 0;

        this.indices = null;
        this.buffer = null;

    }

    create (gl, vertSize = 6, batchSize = 2000) {

        // 65535 is the maximum buffer size (64KB)
        if (vertSize * batchSize > 65535)
        {
            console.warn('VertexIndexBuffer: Cannot create buffer > 65535 bytes');
            return -1;
        }

        this.vertSize = vertSize;
        this.batchSize = batchSize;

        this.indices = new Uint16Array(batchSize * vertSize);

        this.buffer = gl.createBuffer();

        if (!this.buffer)
        {
            return -1;
        }

        this.reset();

    }

    reset () {

        //  Sample indices array for 2 elements (batchSize 2, vertSize 6)
        // [ 0, 1, 2, 0, 2, 3 ]
        // [ 4, 5, 6, 4, 6, 7 ]

        //  0, 1, 2 = the vertices of the first triangle
        //  0, 2, 3 = the vertices of the second triangle (note the two overlapping points)
        //  combined this gives us our quad (or the front face of a cube if we wanted)

        //  4, 5, 6 = the vertices of the first triangle
        //  4, 6, 7 = the vertices of the second triangle
        //  combined this gives us our second quad (or the back face of a cube if we wanted)

        //  And so on ...

        // With 6 indices per quad that's 10922 max

        //  This set-up is quad specific and needs removing from 'reset' and moving to
        //  its own class (QuadIndexBuffer probably)

        for (let i = 0, j = 0; i < (this.batchSize * this.vertSize); i += this.vertSize, j += 4)
        {
            this.indices[i + 0] = j + 0;
            this.indices[i + 1] = j + 1;
            this.indices[i + 2] = j + 2; // first tri
            this.indices[i + 3] = j + 0;
            this.indices[i + 4] = j + 2;
            this.indices[i + 5] = j + 3; // second tri
        }

    }

    bindBuffer (gl) {

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);

    }

    bufferData (gl) {

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    }

}
