import {
    MAX_COLLIDERS
} from 'physics/arcade/Constants.js'

let PolygonColliderDataCount = 0;
export let PolygonColliderCount = 0;
export let PolygonDataX = new Float32Array(MAX_COLLIDERS);
export let PolygonDataY = new Float32Array(MAX_COLLIDERS);
export let PolygonDataMeta = new Uint16Array(MAX_COLLIDERS * 3);

function RegisterPolygonCollider(collider, vertices) {
    let length = vertices.length;
    let index = 0;
    let vx = null;
    let vy = null;
    if (PolygonColliderDataCount + length > MAX_COLLIDERS) {
        return null;
    }
    vx = collider.verticesX = PolygonDataX.subarray(PolygonColliderDataCount, PolygonColliderDataCount + length);
    vy = collider.verticesY = PolygonDataY.subarray(PolygonColliderDataCount, PolygonColliderDataCount + length);
    for (; index < length; ++index) {
        vx[index] = vertices[index][0];
        vy[index] = vertices[index][1];
    }
    collider.ptrMeta = PolygonDataMeta.subarray(PolygonColliderCount, PolygonColliderCount + 3);
    collider.ptrMeta[0] = length;
    collider.ptrMeta[1] = PolygonColliderDataCount;
    collider.ptrMeta[2] = -1;
    PolygonColliderDataCount += length;
    PolygonColliderCount += 3;
    return collider;
}

export default class PolygonCollider {
    constructor(vertices) {
        this.verticesX = null;
        this.verticesY = null;
        this.ptrMeta = null;
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
    get vertexCount() {
        return this.ptrMeta[0];
    }
    get ID() {
        return this.ptrMeta[1];
    }
    get ownerID() {
        return this.ptrMeta[2];
    }
    set ownerID(value) {
        this.ptrMeta[2] = value;
    }
}