export default class PixelData {
    
    constructor (canvas) {

        this.canvas = canvas;

        this.context = canvas.getContext('2d', { alpha: true });

        this.imageData = null;

        /**
        * A Uint8ClampedArray view into BitmapData.buffer.
        * Note that this is unavailable in some browsers such as Epic Browser due to its security restrictions.
        * @property {Uint8ClampedArray} data
        */
        this.data = null;

        /**
        * @property {Uint32Array} pixels - An Uint32Array view into BitmapData.buffer.
        */
        this.pixels = null;

        /**
        * @property {ArrayBuffer} buffer - An ArrayBuffer the same size as the context ImageData.
        */
        this.buffer = null;

        this.update();

    }

    /**
    * This re-creates the imageData from the current context.
    * It then re-builds the ArrayBuffer, the data Uint8ClampedArray reference and the pixels Int32Array.
    */
    update () {

        this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.data = this.imageData.data;

        if (this.imageData.data.buffer)
        {
            this.buffer = this.imageData.data.buffer;
            this.pixels = new Uint32Array(this.buffer);
        }
        else
        {
            if (window.ArrayBuffer)
            {
                this.buffer = new ArrayBuffer(this.imageData.data.length);
                this.pixels = new Uint32Array(this.buffer);
            }
            else
            {
                this.pixels = this.imageData.data;
            }
        }

        return this;

    }

    destroy () {

        this.canvas = null;
        this.context = null;
        this.imageData = null;
        this.data = null;
        this.buffer = null;
        this.pixels = null;

    }

}