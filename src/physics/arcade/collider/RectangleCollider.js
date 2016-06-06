import PolygonCollider from 'physics/arcade/collider/PolygonCollider.js'

export default class RectangleCollider extends PolygonCollider {
    constructor(x, y, width, height) {
        super([
            [x, y],
            [x, y + height],
            [x + width, y + height],
            [x + width, y]
        ]);
        this.width = width;
        this.height = height;
    }
    get x() {
        return this.verticesX[0];
    }
    get y() {
        return this.verticesY[0];
    }
}