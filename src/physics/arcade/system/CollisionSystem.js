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
    RegisterCallbackCollision,
    RegisterCallbackOverlap,
    EmitCallbackCollision,
    EmitCallbackOverlap,
    UpdateCallbacks
} from 'physics/arcade/system/CollisionCallback.js'
import {
    MAX_COLLIDERS
} from 'physics/arcade/Constants.js'
import {
    PolygonToPolygonCorrection,
    PolygonToPolygonOverlap,
    OverlapData,
    OverlapCount,
    ResetOverlap,
    CollideCount,
    CollideData,
    ResetCollide
} from 'physics/arcade/collision/PolygonToPolygon.js'

// Polygon to Polygon Dynamic-Dymamic Collision Request Data.
let PolygonDynamicSize = 0;
let PolygonDynamicA = new Uint16Array(MAX_COLLIDERS * 3);
let PolygonDynamicB = new Uint16Array(MAX_COLLIDERS * 3);

// Polygon to Polygon Overlap Request Data.
let PolygonOverlapSize = 0;
let PolygonOverlapA = new Uint16Array(MAX_COLLIDERS * 3);
let PolygonOverlapB = new Uint16Array(MAX_COLLIDERS * 3);

const Sqrt = Math.sqrt;

export function Collide(bodyA, bodyB, callback) {
    let immovableA = bodyA.immovable;
    let immovableB = bodyB.immovable;

    if (!immovableA && !immovableB) {
        // Store Body ID
        PolygonDynamicA[PolygonDynamicSize] = bodyA.ID;
        // Store Collider ID
        PolygonDynamicA[PolygonDynamicSize + 1] = bodyA.collider.ID;
        // Store Polygon Vertex Count
        PolygonDynamicA[PolygonDynamicSize + 2] = bodyA.collider.vertexCount;
        PolygonDynamicB[PolygonDynamicSize] = bodyB.ID;
        PolygonDynamicB[PolygonDynamicSize + 1] = bodyB.collider.ID;
        PolygonDynamicB[PolygonDynamicSize + 2] = bodyB.collider.vertexCount;
        ++PolygonDynamicSize;
        // Register Callback
        RegisterCallbackCollision(callback);
    } else if (immovableA && !immovableB) {
        RegisterCallbackCollision(callback);
    } else if (immovableB && !immovableA) {
        RegisterCallbackCollision(callback);
    }
}

export function Overlap(bodyA, bodyB, callback) {
    // Store Body ID
    PolygonOverlapA[PolygonOverlapSize] = bodyA.ID;
    // Store Collider ID
    PolygonOverlapA[PolygonOverlapSize + 1] = bodyA.collider.ID;
    // Store Polygon Vertex Count
    PolygonOverlapA[PolygonOverlapSize + 2] = bodyA.collider.vertexCount;
    PolygonOverlapB[PolygonOverlapSize] = bodyB.ID;
    PolygonOverlapB[PolygonOverlapSize + 1] = bodyB.collider.ID;
    PolygonOverlapB[PolygonOverlapSize + 2] = bodyB.collider.vertexCount;
    ++PolygonOverlapSize;
    // Register Callback
    RegisterCallbackOverlap(callback);
}

export function UpdateCollisions() {
    SolvePolygonOverlap();
    SolveDynamicPolygonCollision();
    UpdateCallbacks();
}

function SolveDynamicPolygonCollision() {
    let index = 0;
    let length = PolygonDynamicSize * 3;
    let testCount = 0;
    let aID = 0;
    let aPolygonID = 0;
    let aVertexCount = 0;
    let bID = 0;
    let bPolygonID = 0;
    let bVertexCount = 0;
    let correctionX = 0.0;
    let correctionY = 0.0;
    let nv1 = 0.0;
    let nv2 = 0.0;
    let avg = 0.0;

    for (; index < length; index += 3) {
        aID = PolygonDynamicA[index];
        aPolygonID = PolygonDynamicA[index + 1];
        aVertexCount = PolygonDynamicA[index + 2];

        bID = PolygonDynamicB[index];
        bPolygonID = PolygonDynamicB[index + 1];
        bVertexCount = PolygonDynamicB[index + 2];

        PolygonToPolygonCorrection(
            aID,
            BodyDataPositionX[aID],
            BodyDataPositionY[aID],
            aPolygonID,
            aVertexCount,
            bID,
            BodyDataPositionX[bID],
            BodyDataPositionY[bID],
            bPolygonID,
            bVertexCount,
            testCount++
        );
    }
    PolygonDynamicSize = 0;
    for (index = 0; index < CollideCount; index += 5) {
        aID = CollideData[index];
        bID = CollideData[index + 1];
        correctionX = CollideData[index + 3];
        correctionY = CollideData[index + 4];

        BodyDataPositionX[aID] -= correctionX;
        BodyDataPositionX[bID] += correctionX;
        BodyDataPositionY[aID] -= correctionY;
        BodyDataPositionY[bID] += correctionY;

        nv1 = ((BodyDataVelocityX[bID] * BodyDataVelocityX[aID] * BodyDataMass[bID]) / BodyDataMass[aID]) * 1000;
        // Get abs value
        nv1 = ((nv1 ^ (nv1 >> 31)) - (nv1 >> 31)) / 1000;
        nv1 = Sqrt(nv1);
        // Multiply by sign
        nv1 *= (~((BodyDataVelocityX[bID] >> 31) & 1) + 1) | (((~BodyDataVelocityX[bID] + 1) >> 31) & 1);
        nv2 = ((BodyDataVelocityX[aID] * BodyDataVelocityX[bID] * BodyDataMass[aID]) / BodyDataMass[bID]) * 1000;
        // Get abs value
        nv2 = ((nv2 ^ (nv2 >> 31)) - (nv2 >> 31)) / 1000;
        nv2 = Sqrt(nv2);
        // Multiply by sign
        nv2 *= (~((BodyDataVelocityX[aID] >> 31) & 1) + 1) | (((~BodyDataVelocityX[aID] + 1) >> 31) & 1);
        avg = (nv1 + nv2) * 0.5;
        nv1 -= avg;
        nv2 -= avg;
        BodyDataVelocityX[aID] = avg + nv1 * BodyDataBounceX[aID];
        BodyDataVelocityX[bID] = avg + nv2 * BodyDataBounceX[bID];
        nv1 = ((BodyDataVelocityY[bID] * BodyDataVelocityY[aID] * BodyDataMass[bID]) / BodyDataMass[aID]) * 1000;
        // Get abs value
        nv1 = ((nv1 ^ (nv1 >> 31)) - (nv1 >> 31)) / 1000;
        nv1 = Sqrt(nv1);
        // Multiply by sign
        nv1 *= (~((BodyDataVelocityY[bID] >> 31) & 1) + 1) | (((~BodyDataVelocityY[bID] + 1) >> 31) & 1);
        nv2 = ((BodyDataVelocityY[aID] * BodyDataVelocityY[bID] * BodyDataMass[aID]) / BodyDataMass[bID]) * 1000;
        // Get abs value
        nv2 = ((nv2 ^ (nv2 >> 31)) - (nv2 >> 31)) / 1000;
        nv2 = Sqrt(nv2);
        // Multiply by sign
        nv2 *= (~((BodyDataVelocityY[aID] >> 31) & 1) + 1) | (((~BodyDataVelocityY[aID] + 1) >> 31) & 1);
        avg = (nv1 + nv2) * 0.5;
        nv1 -= avg;
        nv2 -= avg;
        BodyDataVelocityY[aID] = avg + nv1 * BodyDataBounceY[aID];
        BodyDataVelocityY[bID] = avg + nv2 * BodyDataBounceY[bID];
    }
    for (index = 0; index < CollideCount; index += 5) {
        EmitCallbackCollision(CollideData[index + 2], CollideData[index], CollideData[index + 1]);
    }
    ResetCollide();
}

function SolvePolygonOverlap() {
    let index = 0;
    let length = PolygonOverlapSize * 3;
    let testCount = 0;

    for (; index < length; index += 3) {
        let aID = PolygonOverlapA[index];
        let aPolygonID = PolygonOverlapA[index + 1];
        let aVertexCount = PolygonOverlapA[index + 2];

        let bID = PolygonOverlapB[index];
        let bPolygonID = PolygonOverlapB[index + 1];
        let bVertexCount = PolygonOverlapB[index + 2];

        PolygonToPolygonOverlap(
            aID,
            BodyDataPositionX[aID],
            BodyDataPositionY[aID],
            aPolygonID,
            aVertexCount,
            bID,
            BodyDataPositionX[bID],
            BodyDataPositionY[bID],
            bPolygonID,
            bVertexCount,
            testCount++
        );
    }
    PolygonOverlapSize = 0;
    for (index = 0; index < OverlapCount; index += 3) {
        EmitCallbackOverlap(OverlapData[index + 2], OverlapData[index], OverlapData[index + 1]);
    }
    ResetOverlap();
}

/*
function SolveDynamicPolygonToDynamicPolygonCollision(
    BodyDataPositionX,
    BodyDataPositionY,
    BodyDataVelocityX,
    BodyDataVelocityY,
    BodyDataBounceX,
    BodyDataBounceY,
    BodyDataFrictionX,
    BodyDataFrictionY,
    BodyDataMass) {
    let index = 0;
    let length = SystemDPolyToDPolyCollisionReqSize;
    let startA = 0;
    let startB = 0;
    let aID = 0;
    let bID = 0;
    let nv1 = 0.0;
    let nv2 = 0.0;
    let avg = 0.0;

    for (; index < length; index += 3) {
        startA = SystemDPolyToDPolyCollisionReqA[index + 1];
        startB = SystemDPolyToDPolyCollisionReqB[index + 1];
        aID = SystemDPolyToDPolyCollisionReqA[index];
        bID = SystemDPolyToDPolyCollisionReqB[index];

        if (DODPolygonToPolygonCorrection(
                aID,
                startA,
                SystemDPolyToDPolyCollisionReqA[index + 2],
                bID,
                startB,
                SystemDPolyToDPolyCollisionReqB[index + 2],
                BodyDataPositionX,
                BodyDataPositionY)) {
            BodyDataPositionX[aID] -= Correction[0];
            BodyDataPositionX[bID] += Correction[0];
            BodyDataPositionY[aID] -= Correction[1];
            BodyDataPositionY[bID] += Correction[1];
            nv1 = ((BodyDataVelocityX[bID] * BodyDataVelocityX[aID] * BodyDataMass[bID]) / BodyDataMass[aID]) * 1000;
            // Get abs value
            nv1 = ((nv1 ^ (nv1 >> 31)) - (nv1 >> 31)) / 1000;
            nv1 = Sqrt(nv1);
            // Multiply by sign
            nv1 *= (~((BodyDataVelocityX[bID] >> 31) & 1) + 1) | (((~BodyDataVelocityX[bID] + 1) >> 31) & 1);
            nv2 = ((BodyDataVelocityX[aID] * BodyDataVelocityX[bID] * BodyDataMass[aID]) / BodyDataMass[bID]) * 1000;
            // Get abs value
            nv2 = ((nv2 ^ (nv2 >> 31)) - (nv2 >> 31)) / 1000;
            nv2 = Sqrt(nv2);
            // Multiply by sign
            nv2 *= (~((BodyDataVelocityX[aID] >> 31) & 1) + 1) | (((~BodyDataVelocityX[aID] + 1) >> 31) & 1);
            avg = (nv1 + nv2) * 0.5;
            nv1 -= avg;
            nv2 -= avg;
            BodyDataVelocityX[aID] = avg + nv1 * BodyDataBounceX[aID];
            BodyDataVelocityX[bID] = avg + nv2 * BodyDataBounceX[bID];
            nv1 = ((BodyDataVelocityY[bID] * BodyDataVelocityY[aID] * BodyDataMass[bID]) / BodyDataMass[aID]) * 1000;
            // Get abs value
            nv1 = ((nv1 ^ (nv1 >> 31)) - (nv1 >> 31)) / 1000;
            nv1 = Sqrt(nv1);
            // Multiply by sign
            nv1 *= (~((BodyDataVelocityY[bID] >> 31) & 1) + 1) | (((~BodyDataVelocityY[bID] + 1) >> 31) & 1);
            nv2 = ((BodyDataVelocityY[aID] * BodyDataVelocityY[bID] * BodyDataMass[aID]) / BodyDataMass[bID]) * 1000;
            // Get abs value
            nv2 = ((nv2 ^ (nv2 >> 31)) - (nv2 >> 31)) / 1000;
            nv2 = Sqrt(nv2);
            // Multiply by sign
            nv2 *= (~((BodyDataVelocityY[aID] >> 31) & 1) + 1) | (((~BodyDataVelocityY[aID] + 1) >> 31) & 1);
            avg = (nv1 + nv2) * 0.5;
            nv1 -= avg;
            nv2 -= avg;
            BodyDataVelocityY[aID] = avg + nv1 * BodyDataBounceY[aID];
            BodyDataVelocityY[bID] = avg + nv2 * BodyDataBounceY[bID];
            Correction[0] = 0;
            Correction[1] = 0;
            // Pass the callback
            SystemCollisionValidCallback[SystemCollisionValidCallbackSize++] = SystemCollisionRequestCallback[(index / 3) | 0];
        }
    }
    SystemDPolyToDPolyCollisionReqSize = 0;
}
*/