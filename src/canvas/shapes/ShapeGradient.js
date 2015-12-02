export const LINEAR = 0;
export const RADIAL = 1;

export default class ShapeGradient {

    constructor (shape, type = LINEAR, colors = []) {

        this.shape = shape;
        this.type = type;

        this.angle = 0;

        this.gradient = null;

        if (colors.length === 1 && Array.isArray(colors[0]))
        {
            this.colors = colors[0];
        }
        else
        {
            this.colors = colors;
        }

        this.dirty = true;

    }

    update (context) {

        if (this.dirty)
        {
            // this.gradient = context.createLinearGradient(0, 0, this.shape.width * 2, this.shape.height * 2);
            this.gradient = context.createLinearGradient(0, 0, this.shape.width * 2, 0);

            for (let i = 0; i < this.colors.length / 2; i += 2)
            {
                this.gradient.addColorStop(this.colors[i], this.colors[i + 1]);
            }

            this.dirty = false;
        }

        return this.gradient;

    }


    
}