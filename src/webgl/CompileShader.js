/**
 * CompileShader
 * 
 * @param  {object} gl - WebGL Context
 * @param  {string|array} src - Shader source code
 * @param  {integer} type - Type of shader. Either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
 * @return {WebGLShader} The compiled shader, or null if shader could not compile.
 */
export default function (gl, src, type) {

    if (Array.isArray(src))
    {
        src = src.join("\n");
    }

    let shader = gl.createShader(type);

    gl.shaderSource(shader, src);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        console.warn('Failed to compile shader: ' + gl.getShaderInfoLog(shader));

        gl.deleteShader(shader);

        return null;
    }
    else
    {
        return shader;
    }
    
}
