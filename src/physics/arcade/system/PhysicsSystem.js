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
    BodyDataMass,
    BodyDataRotation,
    BodyDataAngularVelocity,
    BodyDataAngularAcceleration,
    BodyDataAngularDrag,
    BodyDataMaxAngular,
    BodyDataAngle
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
        drag = BodyDataDragY[index] * physicsStep;
        if (BodyDataVelocityY[index] - drag > 0) {
            BodyDataVelocityY[index] -= drag;
            continue;
        } else if (BodyDataVelocityY[index] + drag < 0) {
            BodyDataVelocityY[index] += drag;
            continue;
        }
        BodyDataVelocityY[index] = 0;
    }

    // Compute Angular Velocity
    for (index = 0; index < length; ++index) {
        if (BodyDataAngularAcceleration[index] != 0.0) {
            BodyDataAngularVelocity[index] += BodyDataAngularAcceleration[index] * physicsStep;
        }
        drag = BodyDataAngularDrag[index] * physicsStep;
        if (BodyDataAngularVelocity[index] - drag > 0) {
            BodyDataAngularVelocity[index] -= drag;
        } else if (BodyDataAngularVelocity[index] + drag < 0) {
            BodyDataAngularVelocity[index] += drag;
        } else {
            BodyDataAngularVelocity[index] = 0;
        }
        maxVelocity = BodyDataMaxAngular[index];
        if (BodyDataAngularVelocity[index] > maxVelocity) {
            BodyDataAngularVelocity[index] = maxVelocity;
        } else if (BodyDataAngularVelocity[index] < -maxVelocity) {
            BodyDataAngularVelocity[index] = -maxVelocity;
        }
    }
    /*for (index = 0; index < length; ++index) {
        drag = BodyDataAngularDrag[index];
        velocity = BodyDataAngularVelocity[index];
        if (BodyDataAngularAcceleration[index] !== 0.0) {
            velocity += BodyDataAngularAcceleration[index] * physicsStep;
        } else if (drag) {
            drag = drag * physicsStep;
            // TODO: Optimize this branch
            if (velocity - drag > 0) {
                velocity -= drag;
            } else if (velocity + drag < 0) {
                velocity += drag;
            } else {
                velocity = 0;
            }
        }
        maxVelocity = BodyDataMaxAngular[index];
        if (velocity > maxVelocity) {
            velocity = maxVelocity;
        } else if (velocity < -maxVelocity) {
            velocity = -maxVelocity;
        }
        BodyDataAngularVelocity[index] = velocity;        
    }*/

    // Horizontal Position Update
    for (index = 0; index < length; ++index) {
        BodyDataPositionX[index] += BodyDataVelocityX[index];
    }

    // Vertical Position Update
    for (index = 0; index < length; ++index) {
        BodyDataPositionY[index] += BodyDataVelocityY[index];
    }

    // Rotation Update
    for (index = 0; index < length; ++index) {
        BodyDataRotation[index] += BodyDataAngularVelocity[index] * physicsStep;
    }
}