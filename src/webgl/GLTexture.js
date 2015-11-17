export default class GLTexture {

    constructor (gl) {

        this.gl = gl;
        this.texture = null;

    }

    create () {

        this.texture = this.gl.createTexture();

        return this;

    }

    bind () {

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        return this;

    }

    bindCubeMap () {

        this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.texture);

        return this;

    }

    delete () {

        this.gl.deleteTexture(this.texture);

        return this;

    }

    loadImage (image) {

        const gl = this.gl;

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        return this;

    }

    setPackState (alpha = false, flipY = false, colorSpaceConvert = false) {

        const gl = this.gl;

        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, alpha);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
        gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, colorSpaceConvert);

        return this;

    }

    minFilter (linear = true) {

        if (linear)
        {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
        else
        {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        }

        return this;

    }

    magFilter (linear = true) {

        if (linear)
        {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }
        else
        {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        }

    }

    enableLinearScaling () {

        const gl = this.gl;

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        return this;

    }

    enableNearestScaling () {

        const gl = this.gl;

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

        return this;

    }

    wrap (mode) {

        this.wrapS(mode);
        this.wrapT(mode);

        return this;

    }

    //  Texture wrapping in the s axis (left/right)
    wrapS (mode) {

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, mode);

        return this;

    }

    //  Texture wrapping in the t axis (top/bottom)
    wrapT (mode) {

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, mode);

        return this;

    }

    wrapRepeat () {

        return this.wrap(this.gl.REPEAT);

    }

    wrapMirroredRepeat () {

        return this.wrap(this.gl.MIRRORED_REPEAT);

    }

    wrapClamp () {

        return this.wrap(this.gl.CLAMP_TO_EDGE);

    }

    destroy () {

        this.delete();

        this.gl = null;

    }

}