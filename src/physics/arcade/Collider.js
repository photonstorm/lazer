import {
    RegisterPolygonCollider,
    RegisterCircleCollider
} from 'physics/arcade/CollisionSystem.js'

export const POLYGON_COLLIDER = 0;
export const CIRCLE_COLLIDER = 1;

export class PolygonCollider {
    constructor(vertices) {
        this.verticesX = null;
        this.verticesY = null;
        this.ID = -1;
        this.vertexCount = vertices.length;
        RegisterPolygonCollider(
            this,
            vertices
        );
        this.colliderType = POLYGON_COLLIDER;
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

export class CircleCollider {
    constructor(x, y, radius) {
        this.ptrX = null;
        this.ptrY = null;
        this.ptrR = null;
        RegisterCircleCollider(
            this,
            x,
            y,
            radius
        );
        this.colliderType = CIRCLE_COLLIDER;
    }
    get x() {
        return this.ptrX[0];
    }
    get y() {
        return this.ptrY[0];
    }
    get radius() {
        return this.ptrR[0];
    }
    set x(value) {
        this.ptrX[0] = value;
    }
    set y(value) {
        this.ptrY[0] = value;
    }
    set radius(value) {
        this.ptrR[0] = value;
    }
}