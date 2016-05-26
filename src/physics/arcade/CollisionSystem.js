import PtrVec2 from 'physics/arcade/PtrVec2.js'
import {
    GetBodiesPositionX,
    GetBodiesPositionY,
    GetBodiesVelocityX,
    GetBodiesVelocityY,
    GetBodiesBounceX,
    GetBodiesBounceY,
    GetBodiesFrictionX,
    GetBodiesFrictionY,
    GetBodiesMass
}
from 'physics/arcade/PhysicsSystem.js'

import PolygonToPolygonCorrection from 'sat/collision/PolygonToPolygonCorrection.js'
import CorrectionData from 'sat/collision/CorrectionData.js'

const MAX_COLLIDERS = 100000;
let ColliderCount = 0;

// Collider Data.
let SystemColliderDataX = new Float32Array(MAX_COLLIDERS);
let SystemColliderDataY = new Float32Array(MAX_COLLIDERS);

// Collision Request Data.
let SystemCollisionRequestSize = 0;
// TODO: Explore the posibility of using 16 bit array
let SystemCollisionRequestA = new Uint8Array(MAX_COLLIDERS * 3);
let SystemCollisionRequestB = new Uint8Array(MAX_COLLIDERS * 3);

// Collision Callbacks Data.
let SystemCollisionValidCallbackSize = 0;
let SystemCollisionRequestCallbackSize = 0;
let SystemCollisionRequestCallback = new Array(MAX_COLLIDERS);
let SystemCollisionValidCallback = new Array(MAX_COLLIDERS);

export function RegisterPolygonCollider(collider, vertices) {
    let length = vertices.length,
        index = 0;

    if (ColliderCount + length > MAX_COLLIDERS) {
        return null;
    }

    collider.verticesX = SystemColliderDataX.subarray(ColliderCount, ColliderCount + length);
    collider.verticesY = SystemColliderDataY.subarray(ColliderCount, ColliderCount + length);

    for (; index < length; ++index) {
        collider.verticesX[index] = vertices[index][0];
        collider.verticesY[index] = vertices[index][1];
    }
    collider.ID = ColliderCount;
    ColliderCount += length;
    return collider;
}

export function Collide(bodyA, bodyB, callback) {
    SystemCollisionRequestA[SystemCollisionRequestSize] = bodyA.ID;
    SystemCollisionRequestA[SystemCollisionRequestSize + 1] = bodyA.collider.ID;
    SystemCollisionRequestA[SystemCollisionRequestSize + 2] = bodyA.collider.verticesX.length;

    SystemCollisionRequestB[SystemCollisionRequestSize] = bodyB.ID;
    SystemCollisionRequestB[SystemCollisionRequestSize + 1] = bodyB.collider.ID;
    SystemCollisionRequestB[SystemCollisionRequestSize + 2] = bodyB.collider.verticesX.length;
    // TODO: Check if it runs better if we init with empty function.
    SystemCollisionRequestCallback[SystemCollisionRequestCallbackSize++] = callback;
    SystemCollisionRequestSize += 3;
}

// HACK: This is not optimized or DOD focused.
export function RunCollisionFrame() {
    let index = 0,
        length = SystemCollisionRequestSize,
        startA = 0,
        endA = 0,
        startB = 0,
        endB = 0,
        globalPositionX = GetBodiesPositionX(),
        globalPositionY = GetBodiesPositionY(),
        globalVelocityX = GetBodiesVelocityX(),
        globalVelocityY = GetBodiesVelocityY(),
        globalBounceX = GetBodiesBounceX(),
        globalBounceY = GetBodiesBounceY(),
        globalFrictionX = GetBodiesFrictionX(),
        globalFrictionY = GetBodiesFrictionY(),
        globalMass = GetBodiesMass(),
        correctionData = new CorrectionData(),
        Sqrt = Math.sqrt,
        Abs = Math.abs;

    for (; index < length; index += 3) {

        startA = SystemCollisionRequestA[index + 1];
        endA = startA + SystemCollisionRequestA[index + 2];
        startB = SystemCollisionRequestB[index + 1];
        endB = startB + SystemCollisionRequestB[index + 2];

        var vertsA = new Array(SystemCollisionRequestA[index + 2]),
            vertsB = new Array(SystemCollisionRequestB[index + 2]),
            aID = SystemCollisionRequestA[index],
            bID = SystemCollisionRequestB[index],
            nv1 = 0.0,
            nv2 = 0.0,
            avg = 0.0;

        for (var i = 0; i < vertsA.length; ++i) {
            vertsA[i] = [
                globalPositionX[aID] + SystemColliderDataX[startA + i],
                globalPositionY[aID] + SystemColliderDataY[startA + i],
            ];
        }
        for (var i = 0; i < vertsB.length; ++i) {
            vertsB[i] = [
                globalPositionX[bID] + SystemColliderDataX[startB + i],
                globalPositionY[bID] + SystemColliderDataY[startB + i],
            ];
        }
        if (PolygonToPolygonCorrection(vertsA, vertsB, correctionData)) {
            globalPositionX[aID] -= correctionData.correction[0];
            globalPositionY[aID] -= correctionData.correction[1];
            globalPositionX[bID] += correctionData.correction[0];
            globalPositionY[bID] += correctionData.correction[1];

            nv1 = Sqrt(Abs((globalVelocityX[bID] * globalVelocityX[aID] * globalMass[bID]) / globalMass[aID])) * (globalVelocityX[bID] > 0 ? 1 : -1);
            nv2 = Sqrt(Abs((globalVelocityX[aID] * globalVelocityX[bID] * globalMass[aID]) / globalMass[bID])) * (globalVelocityX[aID] > 0 ? 1 : -1);
            avg = (nv1 + nv2) * 0.5;
            nv1 -= avg;
            nv2 -= avg;
            globalVelocityX[aID] = avg + nv1 * globalBounceX[aID];
            globalVelocityX[bID] = avg + nv2 * globalBounceX[bID];

            nv1 = Sqrt(Abs((globalVelocityY[bID] * globalVelocityY[aID] * globalMass[bID]) / globalMass[aID])) * (globalVelocityY[bID] > 0 ? 1 : -1);
            nv2 = Sqrt(Abs((globalVelocityY[aID] * globalVelocityY[bID] * globalMass[aID]) / globalMass[bID])) * (globalVelocityY[aID] > 0 ? 1 : -1);
            avg = (nv1 + nv2) * 0.5;
            nv1 -= avg;
            nv2 -= avg;
            globalVelocityY[aID] = avg + nv1 * globalBounceY[aID];
            globalVelocityY[bID] = avg + nv2 * globalBounceY[bID];
            // Pass the callback
            SystemCollisionValidCallback[SystemCollisionValidCallbackSize++] = SystemCollisionRequestCallback[(index / 3) | 0];
        }
        correctionData.clear();
    }
    SystemCollisionRequestSize = SystemCollisionRequestCallbackSize = 0;
}

export function EmitCollisionCallbacks() {
    let length = SystemCollisionValidCallbackSize,
        index = 0;

    for (; index < length; ++index) {
        SystemCollisionValidCallback[index]();
    }
    SystemCollisionValidCallbackSize = 0;
}

// Init SystemCollisionQueueData
for (let index = 0; index < SystemCollisionRequestA.length; ++index) {
    SystemCollisionRequestA[index] = 0;
    SystemCollisionRequestB[index] = 0;
}