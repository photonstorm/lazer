import {
    BodyCount,
    BodyDataPositionX,
    BodyDataPositionY,
    BodyDataVelocityX,
    BodyDataVelocityY,
    BodyDataAccelerationX,
    BodyDataAccelerationY,
    BodyDataGravityX,
    BodyDataGravityY,
    BodyDataBounceX,
    BodyDataBounceY,
    BodyDataMaxVelocityX,
    BodyDataMaxVelocityY,
    BodyDataFrictionX,
    BodyDataFrictionY,
    BodyDataDragX,
    BodyDataDragY,
    BodyDataMass
} from 'physics/arcade/Body.js'
import {
    MAX_COLLIDERS
} from 'physics/arcade/Constants.js'

export let GlobalGravityX = 0.0;
export let GlobalGravityY = 0.0;

export default function UpdatePhysics(physicsStep) {
    let index = 0,
        length = BodyCount,
        velocity = 0.0,
        maxVelocity = 0.0,
        drag = 0.0;

    // Compute Horizontal Velocity
    for (; index < length; ++index) {
        BodyDataVelocityX[index] += (GlobalGravityX + BodyDataGravityX[index]) * physicsStep;
        BodyDataVelocityX[index] += BodyDataAccelerationX[index];
    }

    for (index = 0; index < length; ++index) {
        if (BodyDataAccelerationX[index] != 0.0) {
            continue;
        }
        drag = BodyDataDragX[index] * physicsStep;
        if (BodyDataVelocityX[index] - drag > 0) {
            BodyDataVelocityX[index] -= drag;
            continue;
        } else if (BodyDataVelocityX[index] + drag < 0) {
            BodyDataVelocityX[index] += drag;
            continue;
        }
        BodyDataVelocityX[index] = 0;
    }

    for (index = 0; index < length; ++index) {
        velocity = BodyDataVelocityX[index];
        maxVelocity = BodyDataMaxVelocityX[index];
        if (velocity > maxVelocity) {
            BodyDataVelocityX[index] = maxVelocity;
        } else if (velocity < -maxVelocity) {
            BodyDataVelocityX[index] = -maxVelocity;
        }
    }

    // Compute Vertical Velocity
    for (index = 0; index < length; ++index) {
        BodyDataVelocityY[index] += (GlobalGravityY + BodyDataGravityY[index]) * physicsStep;
        BodyDataVelocityY[index] += BodyDataAccelerationY[index];
    }

    for (index = 0; index < length; ++index) {
        if (BodyDataAccelerationY[index] != 0.0) {
            continue;
        }
        drag = dragData[index] * physicsStep;
        if (BodyDataVelocityY[index] - drag > 0) {
            BodyDataVelocityY[index] -= drag;
            continue;
        } else if (BodyDataVelocityY[index] + drag < 0) {
            BodyDataVelocityY[index] += drag;
            continue;
        }
        BodyDataVelocityY[index] = 0;
    }

    for (index = 0; index < length; ++index) {
        velocity = BodyDataVelocityY[index];
        maxVelocity = BodyDataMaxVelocityY[index];
        if (velocity > maxVelocity) {
            BodyDataVelocityY[index] = maxVelocity;
        } else if (velocity < -maxVelocity) {
            BodyDataVelocityY[index] = -maxVelocity;
        }
    }

    // Horizontal Position Update
    for (index = 0; index < length; ++index) {
        BodyDataPositionX[index] += BodyDataVelocityX[index];
    }

    // Vertical Position Update
    for (index = 0; index < length; ++index) {
        BodyDataPositionY[index] += BodyDataVelocityY[index];
    }
}