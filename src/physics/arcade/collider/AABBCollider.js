import {
    MAX_COLLIDERS,
    AABB_COLLIDER
} from 'physics/arcade/Constants.js'

let AABBColliderDataCount = 0;
export let AABBData = new Float32Array(MAX_COLLIDERS * 4);

function RegisterAABBCollider(collider, x, y, width, height) {
    collider.data = AABBData.subarray(AABBColliderDataCount, AABBColliderDataCount + 4);
    collider.data[0] = x;
    collider.data[1] = y;
    collider.data[2] = width;
    collider.data[3] = height;
    collider.ID = AABBColliderDataCount;
    AABBColliderDataCount += 4;
    return collider;
}

export default class AABBCollider {
    constructor(x, y, width, height) {
        this.data = null;
        this.type = AABB_COLLIDER;
        this.ID = -1;
        RegisterAABBCollider(this, x, y, width, height);
    }
    get x() {
        return this.data[0];
    }
    get y() {
        return this.data[1];
    }
    get width() {
        return this.data[2];
    }
    get height() {
        return this.data[3];
    }
    set x(value) {
        this.data[0] = value;
    }
    set y(value) {
        this.data[1] = value;
    }
    set width(value) {
        this.data[2] = value;
    }
    set height(value) {
        this.data[3] = value;
    }
}