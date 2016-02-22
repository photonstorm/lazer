import HSVColorWheel from 'graphics/color/HSVColorWheel.js';
import * as SetPixels from 'canvas/pixels/SetPixels.js';
import GetImageData from 'canvas/imagedata/GetImageData.js';

export default class Plasma {
    
    constructor (x, y, width, height) {

        this.pos1 = 0;
        this.pos2 = 5;
        this.pos3 = 0;
        this.pos4 = 0;
        this.depth = 128;

        this._tpos1 = 293;
        this._tpos2 = 483;
        this._tpos3 = 120;
        this._tpos4 = 360;
        
        this._aSin = [];
        this._colors = [];
        this._step = 0;
        this._span = 0;

        this.width = width;
        this.height = height;

        this.create(x, y, width, height);

    }

    create (x, y, width, height) {

        this._colors = HSVColorWheel();

        this._span = this._colors.length - 1;
        this._aSin = [];

        for (let i = 0; i < 1024; i++)
        {
            let rad = (i * 0.703125) * 0.0174532;
            
            //  Any power of 2!
            //  256, 512, 1024, 2048, 4096, 8192, 16384
            this._aSin[i] = Math.sin(rad) * 1024;
        }

    }

    render (ctx) {

        let imageData = GetImageData(ctx);

        SetPixels.load(ctx, imageData);

        if (this._step < 10)
        {
            this._step++;
        }

        this._tpos4 = this.pos4;
        this._tpos3 = this.pos3;

        for (let y = 0; y < this.height; y++)
        {
            //  512 / 511
            this._tpos1 = this.pos1 + 5;
            this._tpos2 = this.pos2 + 3;
            this._tpos2 &= 511;
            this._tpos3 &= 511;

            for (let x = 0; x < this.width; x++)
            {
                this._tpos1 &= 511;
                this._tpos2 &= 511;
                
                let x2 = this._aSin[this._tpos1] + this._aSin[this._tpos2] + this._aSin[this._tpos3] + this._aSin[this._tpos4];
                
                // let i3 = x2;
                let index = this.depth + (x2 >> 4);

                //  
                // let index2 = index;
                // let r1 = false;
                // let r2 = false;
                // let i1 = 0;
                // let i2 = 0;

                if (index < 0)
                {
                    // r1 = true;
                    // i1 = index2;
                    index += this._span;

                    if (index < 0)
                    {
                        index = 0;
                    }
                }
                
                if (index >= this._span)
                {
                    // r2 = true;
                    // i2 = index2;
                    index -= this._span;
                }
                    
                if (!this._colors[index])
                {
                    console.log('bad index', index);
                    debugger;
                }

                // index = index2;

                SetPixels.set(x, y, this._colors[index].r, this._colors[index].g, this._colors[index].b);
                
                this._tpos1 += 5;
                this._tpos2 += 3;
            }

            this._tpos3 += 1;
            this._tpos4 += 3;
        }

        SetPixels.write();

        this.pos1 += 4;  // horizontal shift
        this.pos3 += 2;  // vertical shift
    }

}