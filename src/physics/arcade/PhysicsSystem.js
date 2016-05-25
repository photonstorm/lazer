// This is a value that could be set at initialization.
const MAX_BODIES = 10000;
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
    body.ID = OldBodyCount;
    return body;
}

// All elements in this calculation are arrays.
export function ComputeBodiesVelocity(velocityData, accelerationData, maxData /*, delta*/ ) {
    let index = 0,
        length = BodyCount,
        velocity = 0.0,
        maxVelocity = 0.0;

    for (; index < length; ++index) {
        velocityData[index] += accelerationData[index];
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

export function RunSimulationFrame(/* delta ?*/) {
    ComputeBodiesVelocity(SystemDataVelocityX, SystemDataAccelerationX, SystemDataMaxVelocityX);
    ComputeBodiesVelocity(SystemDataVelocityY, SystemDataAccelerationY, SystemDataMaxVelocityY);
    UpdateBodiesPosition(SystemDataPositionX, SystemDataVelocityX);
    UpdateBodiesPosition(SystemDataPositionY, SystemDataVelocityY);
    // Here we should run collision check.
}