import {
    RegisterBody
}
from 'physics/arcade/PhysicsSystem.js';

export default class Body {
    constructor(x, y, collider) {
        if (collider === null || typeof collider === 'undefined') {
            throw 'Body must include collider.';
        }
        this.position = null;
        this.velocity = null;
        this.acceleration = null;
        this.gravity = null;
        this.bounce = null;
        this.maxVelocity = null;
        this.friction = null;
        this.drag = null;
        this.ID = -1;
        this.ptrMass = null;
        this.collider = collider;
        RegisterBody(
            this,
            x, y,
            0, 0,
            0, 0,
            0, 0,
            0, 0,
            10000, 10000,
            1, 0,
            0, 0
        );
    }
    get mass() {
        return this.ptrMass[0];
    }
    set mass(value) {
        this.ptrMass[0] = value;
    }
}