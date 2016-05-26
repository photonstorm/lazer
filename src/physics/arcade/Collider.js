import {
    RegisterPolygonCollider
} from 'physics/arcade/CollisionSystem.js'

export class PolygonCollider {
    constructor(vertices) {
        this.verticesX = null;
        this.verticesY = null;
        this.ID = -1;
        RegisterPolygonCollider(
            this,
            vertices
        );
    }
    getX(index) {
        return this.verticesX[index];
    }
    getY(index) {
        return this.verticesY[index];
    }
}

export class RectangleCollider extends PolygonCollider {
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

// TODO: Implement Circle Collider