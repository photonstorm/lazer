import {
    MAX_COLLIDERS
} from 'physics/arcade/Constants.js'

export let PolygonDataX = new Float32Array(MAX_COLLIDERS);
export let PolygonDataY = new Float32Array(MAX_COLLIDERS);
let PolygonColliderCount = 0;

function RegisterPolygonCollider(collider, vertices) {
    let length = vertices.length;
    let index = 0;
    let vx = null;
    let vy = null;
    if (PolygonColliderCount + length > MAX_COLLIDERS) {
        return null;
    }
    vx = collider.verticesX = PolygonDataX.subarray(PolygonColliderCount, PolygonColliderCount + length);
    vy = collider.verticesY = PolygonDataX.subarray(PolygonColliderCount, PolygonColliderCount + length);
    for (; index < length; ++index) {
        vx[index] = vertices[index][0];
        vy[index] = vertices[index][1];
    }
    collider.ID = PolygonColliderCount;
    PolygonColliderCount += length;
    return collider;
}

export default class PolygonCollider {
    constructor(vertices) {
        this.verticesX = null;
        this.verticesY = null;
        this.ID = -1;
        this.vertexCount = vertices.length;
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