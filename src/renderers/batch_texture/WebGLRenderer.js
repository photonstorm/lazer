import ContextHandler from 'webgl/ContextHandler.js';
import ContextOptions from 'webgl/ContextOptions.js';
import GetContext from 'webgl/GetContext.js';
import CompileShader from 'webgl/CompileShader.js';
import Program from 'webgl/Program.js';
import VertexArrayBuffer from 'webgl/vbo/VertexArrayBuffer.js';
import VertexIndexBuffer from 'webgl/vbo/VertexIndexBuffer.js';
import * as Attribute from 'webgl/Attribute.js';

export default class WebGLBatchedPointRenderer {

    constructor (canvas) {

        // this.width = 0;
        // this.height = 0;
        this.projection = { x: 0, y: 0 };

        this.contextOptions = ContextOptions();
        this.contextHandler = new ContextHandler();

        this.vertexBuffer = new VertexArrayBuffer();
        this.indexBuffer = new VertexIndexBuffer();

        this.gl = null;
        this.program = null;

        if (canvas)
        {
            this.init(canvas);
        }

    }

    init (canvas) {

        //  clientWidth is only available if the canvas is on the dom
        // this.width = canvas.clientWidth;
        // this.height = canvas.clientHeight;

        this.contextHandler.add(canvas);

        const gl = GetContext(canvas);

        if (!gl)
        {
            throw new Error('Browser does not support WebGL');
        }
        else
        {
            this.gl = gl;
        }

        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.BLEND);

        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

        const vertexSrc = [
            'attribute vec2 aVertexPosition;',
            'attribute vec2 aTextureCoord;',
            'attribute vec4 aColor;',

            'uniform vec2 projectionVector;',

            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',

            'const vec2 center = vec2(-1.0, 1.0);',

            'void main(void) {',
            '   gl_Position = vec4((aVertexPosition / projectionVector) + center, 0.0, 1.0);',
            '   vTextureCoord = aTextureCoord;',
            '   vec3 color = mod(vec3(aColor.y / 65536.0, aColor.y / 256.0, aColor.y), 256.0) / 256.0;',
            '   vColor = vec4(color * aColor.x, aColor.x);',
            '}'
        ];

        const fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform sampler2D uSampler;',
            'void main(void) {',
            '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;',
            '}'
        ];

        const vertexShader = CompileShader(gl, vertexSrc, gl.VERTEX_SHADER);
        const fragmentShader = CompileShader(gl, fragmentSrc, gl.FRAGMENT_SHADER);

        this.program = new Program(gl);

        this.program.attach(vertexShader, fragmentShader).link().use();

        //  Get and store the attributes
        this._aVertexPosition = Attribute.getLocation(gl, this.program.program, 'aVertexPosition');
        this._aTextureCoord = Attribute.getLocation(gl, this.program.program, 'aTextureCoord');
        this._colorAttribute = Attribute.getLocation(gl, this.program.program, 'aColor');

        //  vertex position
        gl.enableVertexAttribArray(0);

        //  texture coordinate
        gl.enableVertexAttribArray(1);

        //  color attribute
        gl.enableVertexAttribArray(2);

        //  The projection vector (middle of the game world)
        this.projectionVector = gl.getUniformLocation(this.program.program, 'projectionVector');

        //  Populate the vertex buffer
        this.vertexBuffer.create(gl, 6, 2000);
        this.vertexBuffer.bindBuffer();
        this.vertexBuffer.bufferDynamicData();

        //  Populate the index buffer
        this.indexBuffer.create(gl, 6, 2000);
        this.indexBuffer.bindBuffer();
        this.indexBuffer.bufferData();

    }

    resize () {

        const width = this.gl.canvas.clientWidth;
        const height = this.gl.canvas.clientHeight;

        if (width !== this.gl.canvas.width)
        {
            this.gl.canvas.width = width;
        }

        if (height !== this.gl.canvas.height)
        {
            this.gl.canvas.height = height;
        }

        this.projection.x =  width / 2;
        this.projection.y =  -height / 2;

    }

    render (renderList) {

        if (this.contextHandler.contextLost)
        {
            return;
        }

        this.resize();

        const gl = this.gl;

        //  Resets the frame buffer (if it's been re-assigned elsewhere via stencil, etc)
        // gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        //  Transparent
        // gl.clearColor(0, 0, 0, 0);

        //  Black
        gl.clearColor(0, 0, 0, 1);

        gl.clear(gl.COLOR_BUFFER_BIT);

        this.vertexBuffer.reset();

        //  Walk the render list
        for (let texture of renderList)
        {

        }

    }


    flush () {
        
    }

}
