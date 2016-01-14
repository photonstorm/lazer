import BaseTransform from 'math/transform/2d/basic/BaseTransform.js';
import SetTransformToContext from 'math/transform/2d/SetTransformToContext.js';

class Sprite extends BaseTransform {

    constructor (image, x, y) {

        super(x, y);

        this.texture = { image: image, width: image.width, height: image.height };

        // this.rotationAnchor.set(0.5);
        // this.transform.enableInterpolation();

    }

    render (ctx, i) {

        SetTransformToContext(this.transform, ctx, i);

        let dx = this.rotationAnchor.x * -this.texture.width;
        let dy = this.rotationAnchor.y * -this.texture.height;

        ctx.drawImage(this.texture.image, dx, dy);

    }

}
