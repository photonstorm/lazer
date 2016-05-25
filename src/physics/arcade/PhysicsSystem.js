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

// System global values

let SystemGlobalGravityX = 0;
let SystemGlobalGravityY = 0;

// This will give external access to body component data
// for developer use if they need it for something special. 
export function GetBodiesPosition() {
    return {
        x: SystemDataPositionX.subarray(0, BodyCount),
        y: SystemDataPositionY.subarray(0, BodyCount)
    };
}
export function GetBodiesVelocity() {
    return {
        x: SystemDataVelocityX.subarray(0, BodyCount),
        y: SystemDataVelocityY.subarray(0, BodyCount)
    };
}
export function GetBodiesAcceleration() {
    return {
        x: SystemDataAccelerationX.subarray(0, BodyCount),
        y: SystemDataAccelerationY.subarray(0, BodyCount)
    };
}
export function GetBodiesGravity() {
    return {
        x: SystemDataGravityX.subarray(0, BodyCount),
        y: SystemDataGravityY.subarray(0, BodyCount)
    };
}
export function GetBodiesBounce() {
    return {
        x: SystemDataBounceX.subarray(0, BodyCount),
        y: SystemDataBounceY.subarray(0, BodyCount)
    };
}
export function GetBodiesMaxVelocity() {
    return {
        x: SystemDataMaxVelocityX.subarray(0, BodyCount),
        y: SystemDataMaxVelocityY.subarray(0, BodyCount)
    };
}
export function GetBodiesFriction() {
    return {
        x: SystemDataFrictionX.subarray(0, BodyCount),
        y: SystemDataFrictionY.subarray(0, BodyCount)
    };
}
export function GetBodiesDrag() {
        return {
            x: SystemDataDragX.subarray(0, BodyCount),
            y: SystemDataDragY.subarray(0, BodyCount)
        };
    }
    // ---

export function ClearAllBodies() {
    BodyCount = 0;
}

// This must be a body created with Body.js
export function RegisterBody(body) {
    let OldBodyCount = BodyCount++;
    if (OldBodyCount >= MAX_BODIES) {
        return null;
    }
    body.position.init(
        SystemDataPositionX.subarray(OldBodyCount, BodyCount),
        SystemDataPositionY.subarray(OldBodyCount, BodyCount)
    );
    body.velocity.init(
        SystemDataVelocityX.subarray(OldBodyCount, BodyCount),
        SystemDataVelocityY.subarray(OldBodyCount, BodyCount)
    );
    body.acceleration.init(
        SystemDataAccelerationX.subarray(OldBodyCount, BodyCount),
        SystemDataAccelerationY.subarray(OldBodyCount, BodyCount)
    );
    body.gravity.init(
        SystemDataGravityX.subarray(OldBodyCount, BodyCount),
        SystemDataGravityY.subarray(OldBodyCount, BodyCount)
    );
    body.bounce.init(
        SystemDataBounceX.subarray(OldBodyCount, BodyCount),
        SystemDataBounceX.subarray(OldBodyCount, BodyCount)
    );
    body.maxVelocity.init(
        SystemDataMaxVelocityX.subarray(OldBodyCount, BodyCount),
        SystemDataMaxVelocityY.subarray(OldBodyCount, BodyCount)
    );
    body.friction.init(
        SystemDataFrictionX.subarray(OldBodyCount, BodyCount),
        SystemDataFrictionY.subarray(OldBodyCount, BodyCount)
    );
    body.drag.init(
        SystemDataDragX.subarray(OldBodyCount, BodyCount),
        SystemDataDragY.subarray(OldBodyCount, BodyCount)
    );
    body.ID = OldBodyCount;
    return body;
}

// All elements in this calculation are arrays.
export function ComputeBodiesVelocity(velocityData, accelerationData, maxData, gravityData, dragData, globalGravity, physicsStep) {
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

//export function RunCollisionTestFrame()