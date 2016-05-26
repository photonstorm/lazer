import PtrVec2 from 'physics/arcade/PtrVec2.js'

// This is a value that could be set at initialization.
const MAX_BODIES = 100000;
let BodyCount = 0;

// Helping data locality by splitting members
// into big arrays.

let SystemDataPositionX = new Float32Array(MAX_BODIES);
let SystemDataPositionY = new Float32Array(MAX_BODIES);
let SystemDataVelocityX = new Float32Array(MAX_BODIES);
let SystemDataVelocityY = new Float32Array(MAX_BODIES);
let SystemDataAccelerationX = new Float32Array(MAX_BODIES);
let SystemDataAccelerationY = new Float32Array(MAX_BODIES);
let SystemDataGravityX = new Float32Array(MAX_BODIES);
let SystemDataGravityY = new Float32Array(MAX_BODIES);
let SystemDataBounceX = new Float32Array(MAX_BODIES);
let SystemDataBounceY = new Float32Array(MAX_BODIES);
let SystemDataMaxVelocityX = new Float32Array(MAX_BODIES);
let SystemDataMaxVelocityY = new Float32Array(MAX_BODIES);
let SystemDataFrictionX = new Float32Array(MAX_BODIES);
let SystemDataFrictionY = new Float32Array(MAX_BODIES);
let SystemDataDragX = new Float32Array(MAX_BODIES);
let SystemDataDragY = new Float32Array(MAX_BODIES);
let SystemDataMass = new Float32Array(MAX_BODIES);

// System global values

let SystemGlobalGravityX = 0;
let SystemGlobalGravityY = 0;

// This will give external access to body component data
// for developer use if they need it for something special. 
export function GetBodiesPositionX() {
    return SystemDataPositionX.subarray(0, BodyCount);
}
export function GetBodiesPositionY() {
    return SystemDataPositionY.subarray(0, BodyCount);
}
export function GetBodiesVelocityX() {
    return SystemDataVelocityX.subarray(0, BodyCount);
}
export function GetBodiesVelocityY() {
    return SystemDataVelocityY.subarray(0, BodyCount);
}
export function GetBodiesBounceX() {
    return SystemDataBounceX.subarray(0, BodyCount);
}
export function GetBodiesBounceY() {
    return SystemDataBounceY.subarray(0, BodyCount);
}
export function GetBodiesFrictionX() {
    return SystemDataFrictionX.subarray(0, BodyCount);
}
export function GetBodiesFrictionY() {
    return SystemDataFrictionY.subarray(0, BodyCount);
}
export function GetBodiesMass() {
    return SystemDataMass.subarray(0, BodyCount);
}
export function ClearAllBodies() {
    BodyCount = 0;
}

// This must be a body created with Body.js
export function RegisterBody(
    body,
    positionX = 0,
    positionY = 0,
    velocityX = 0,
    velocityY = 0,
    accelerationX = 0,
    accelerationY = 0,
    gravityX = 0,
    gravityY = 0,
    bounceX = 0,
    bounceY = 0,
    maxVelocityX = 10000,
    maxVelocityY = 10000,
    frictionX = 1,
    frictionY = 0,
    dragX = 0,
    dragY = 0,
    mass = 1
) {
    let OldBodyCount = BodyCount++;
    if (OldBodyCount >= MAX_BODIES) {
        return null;
    }
    body.position = new PtrVec2(
        SystemDataPositionX.subarray(OldBodyCount, BodyCount),
        SystemDataPositionY.subarray(OldBodyCount, BodyCount),
        positionX, positionY
    );
    body.velocity = new PtrVec2(
        SystemDataVelocityX.subarray(OldBodyCount, BodyCount),
        SystemDataVelocityY.subarray(OldBodyCount, BodyCount),
        velocityX, velocityY
    );
    body.acceleration = new PtrVec2(
        SystemDataAccelerationX.subarray(OldBodyCount, BodyCount),
        SystemDataAccelerationY.subarray(OldBodyCount, BodyCount),
        accelerationX, accelerationY
    );
    body.gravity = new PtrVec2(
        SystemDataGravityX.subarray(OldBodyCount, BodyCount),
        SystemDataGravityY.subarray(OldBodyCount, BodyCount),
        gravityX, gravityY
    );
    body.bounce = new PtrVec2(
        SystemDataBounceX.subarray(OldBodyCount, BodyCount),
        SystemDataBounceY.subarray(OldBodyCount, BodyCount),
        bounceX, bounceY
    );
    body.maxVelocity = new PtrVec2(
        SystemDataMaxVelocityX.subarray(OldBodyCount, BodyCount),
        SystemDataMaxVelocityY.subarray(OldBodyCount, BodyCount),
        maxVelocityX, maxVelocityY
    );
    body.friction = new PtrVec2(
        SystemDataFrictionX.subarray(OldBodyCount, BodyCount),
        SystemDataFrictionY.subarray(OldBodyCount, BodyCount),
        frictionX, frictionY
    );
    body.drag = new PtrVec2(
        SystemDataDragX.subarray(OldBodyCount, BodyCount),
        SystemDataDragY.subarray(OldBodyCount, BodyCount),
        dragX, dragY
    );
    body.ptrMass = SystemDataMass.subarray(OldBodyCount, BodyCount);
    body.ptrMass[0] = mass;
    body.ID = OldBodyCount;
    return body;
}

// All elements in this calculation are arrays.
export function ComputeBodiesVelocity(
    velocityData,
    accelerationData,
    maxData,
    gravityData,
    dragData,
    globalGravity,
    physicsStep
) {
    let index = 0,
        length = BodyCount,
        velocity = 0.0,
        maxVelocity = 0.0,
        drag = 0.0;

    for (; index < length; ++index) {
        velocityData[index] += (globalGravity + gravityData[index]) * physicsStep;
        velocityData[index] += accelerationData[index];
    }

    for (index = 0; index < length; ++index) {
        if (accelerationData[index] != 0.0) {
            continue;
        }
        drag = dragData[index] * physicsStep;
        if (velocityData[index] - drag > 0) {
            velocityData[index] -= drag;
            continue;
        } else if (velocityData[index] + drag < 0) {
            velocityData[index] += drag;
            continue;
        }
        velocityData[index] = 0;
    }

    for (index = 0; index < length; ++index) {
        velocity = velocityData[index];
        maxVelocity = maxData[index];
        if (velocity > maxVelocity) {
            velocityData[index] = maxVelocity;
        } else if (velocity < -maxVelocity) {
            velocityData[index] = -maxVelocity;
        }
    }
}

export function UpdateBodiesPosition(positionData, velocityData) {
    let index = 0,
        length = BodyCount;

    for (; index < length; ++index) {
        positionData[index] += velocityData[index];
    }
}

export function RunSimulationFrame(physicsStep) {
    ComputeBodiesVelocity(
        SystemDataVelocityX,
        SystemDataAccelerationX,
        SystemDataMaxVelocityX,
        SystemDataGravityX,
        SystemDataDragX,
        SystemGlobalGravityX,
        physicsStep
    );
    ComputeBodiesVelocity(
        SystemDataVelocityY,
        SystemDataAccelerationY,
        SystemDataMaxVelocityY,
        SystemDataGravityY,
        SystemDataDragY,
        SystemGlobalGravityY,
        physicsStep
    );
    UpdateBodiesPosition(SystemDataPositionX, SystemDataVelocityX);
    UpdateBodiesPosition(SystemDataPositionY, SystemDataVelocityY);
}