import WebGLContextOptions from 'webgl/ContextOptions.js';
import WebGLContextHandler from 'webgl/ContextHandler.js';
import WebGLGetContext from 'webgl/GetContext.js';
import CompileShader from 'webgl/CompileShader.js';
import WebGLProgram from 'webgl/Program.js';

export default class WebGLPointRenderer {

    constructor (canvas) {

        this.width = 0;
        this.height = 0;

        this.contextOptions = WebGLContextOptions();
        this.contextHandler = new WebGLContextHandler();

        this.gl = null;
        this.program = null;

        if (canvas)
        {
            this.init(canvas);
        }

    }

    init (canvas) {

        this.width = canvas.width;
        this.height = canvas.height;

        this.contextHandler.add(canvas);

        this.gl = WebGLGetContext(canvas);

        if (!this.gl)
        {
            throw new Error('Browser does not support WebGL');
        }

        //  Our super basic shaders

        let vertexSrc = [
            'attribute vec4 pointPosition;',
            'attribute float pointSize;',
            'void main() {',
            '   gl_Position = pointPosition;',
            '   gl_PointSize = pointSize;',
            '}'
        ];

        let fragmentSrc = [
            'void main() {',
            '   gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);',
            '}'
        ];

        let vertexShader = CompileShader(this.gl, vertexSrc, this.gl.VERTEX_SHADER);
        let fragmentShader = CompileShader(this.gl, fragmentSrc, this.gl.FRAGMENT_SHADER);

        this.program = new WebGLProgram(this.gl);

        this.program.attach(vertexShader, fragmentShader).link().use();

        this.pos = this.program.getAttrib('pointPosition');
        this.size = this.program.getAttrib('pointSize');

        this.gl.vertexAttrib3f(this.pos, 0.0, 0.0, 0.0);
        this.gl.vertexAttrib1f(this.size, 32.0);

    }

    update (x, y) {

        //  Map to WebGL coordinate space
        const cx = this.width / 2;
        const cy = this.height / 2;

        const tx = (x - cx) / cx;
        const ty = (cy - y) / cy;

        this.gl.vertexAttrib3f(this.pos, tx, ty, 0.0);

    }

    render () {

        this.gl.clearColor(0, 0, 0, 1);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.drawArrays(this.gl.POINTS, 0, 1);

    }

}