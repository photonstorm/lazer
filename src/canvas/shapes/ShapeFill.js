import LinearGradient from 'canvas/graphics/LinearGradient.js';
import RadialGradient from 'canvas/graphics/RadialGradient.js';

export const SOLID = 0;
export const PATTERN = 1;
export const LINEAR_HORIZONTAL = 2;
export const LINEAR_VERTICAL = 3;
export const LINEAR_DIAGONAL = 4;
export const RADIAL = 5;

export default class ShapeFill {

    constructor (shape, type = SOLID) {

        this.shape = shape;

        this.type = type;

        this.angle = 0;

        this.colors = null;
        this.pattern = null;
        this.gradient = null;
        this.colorString = '';

        this.style = 'rgba(0,0,0,1)';

        this.dirty = false;

    }

    setSolid (colorString) {

        this.type = SOLID;
        this.colorString = colorString;
        this.style = colorString;

        return this;

    }

    setSolidFromRGB (r, g, b, a = 1) {

        this.type = SOLID;
        this.colorString = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        this.style = this.colorString;

        return this;

    }

    setPattern (pattern) {

        this.type = PATTERN;
        this.pattern = pattern;
        this.style = pattern;

        return this;

    }

    setLinearGradientHorizontal (...colors) {

        this.type = LINEAR_HORIZONTAL;

        return this.setColors(colors);

    }

    setLinearGradientVertical (...colors) {

        this.type = LINEAR_VERTICAL;

        return this.setColors(colors);

    }

    setLinearGradientDiagonal (...colors) {

        this.type = LINEAR_DIAGONAL;

        return this.setColors(colors);

    }

    setRadialGradient (...colors) {

        this.type = RADIAL;

        return this.setColors(colors);

    }

    setColors (...colors) {

        if (colors.length === 1 && Array.isArray(colors[0]))
        {
            console.log('setColors A');
            this.colors = colors[0];
        }
        else
        {
            console.log('setColors B');
            this.colors = colors;
        }

        this.dirty = true;

        return this;

    }

    updateGradient (context) {

        this.gradient = null;

        if (this.type === LINEAR_HORIZONTAL)
        {
            this.gradient = context.createLinearGradient(0, 0, 0, this.shape.width * 2);
        }
        else if (this.type === LINEAR_VERTICAL)
        {
            this.gradient = context.createLinearGradient(0, 0, this.shape.width * 2, 0);
        }
        else if (this.type === LINEAR_DIAGONAL)
        {
            this.gradient = context.createLinearGradient(0, 0, this.shape.width * 2, this.shape.height * 2);
        }
        else if (this.type === RADIAL)
        {
            //  TODO
        }

        if (this.gradient)
        {
            for (let i = 0; i < this.colors.length / 2; i += 2)
            {
                console.log('addColorStop', this.colors[i], this.colors[i + 1]);

                this.gradient.addColorStop(this.colors[i], this.colors[i + 1]);
            }

            this.style = this.gradient;
        }

        this.dirty = false;

        return this;

    }

    draw (context) {

        if (this.dirty)
        {
            this.updateGradient(context);
        }

        context.fillStyle = this.style;

        context.fill();

    }

}
