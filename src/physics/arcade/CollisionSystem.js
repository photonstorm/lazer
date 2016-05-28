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


const MAX_COLLIDERS = 100000;
let ColliderCount = 0;

// Collider Data.
let SystemPColliderDataX = new Float32Array(MAX_COLLIDERS);
let SystemPColliderDataY = new Float32Array(MAX_COLLIDERS);

// Collision Request Data.
let SystemDPolyToDPolyCollisionReqSize = 0;
// TODO: Explore the posibility of using 16 bit array
let SystemDPolyToDPolyCollisionReqA = new Uint8Array(MAX_COLLIDERS * 3);
let SystemDPolyToDPolyCollisionReqB = new Uint8Array(MAX_COLLIDERS * 3);

let SystemSPolyToDPolyCollisionReqSize = 0;
let SystemSPolyToDPolyCollisionReqA = new Uint8Array(MAX_COLLIDERS * 3);
let SystemSPolyToDPolyCollisionReqB = new Uint8Array(MAX_COLLIDERS * 3);

// Collision Callbacks Data.
let SystemCollisionValidCallbackSize = 0;
let SystemCollisionRequestCallbackSize = 0;
let SystemCollisionRequestCallback = new Array(MAX_COLLIDERS);
let SystemCollisionValidCallback = new Array(MAX_COLLIDERS);

let NormalsPoolX = new Float32Array(MAX_COLLIDERS);
let NormalsPoolY = new Float32Array(MAX_COLLIDERS);
let NormalsPoolUsed = 0;
let ProjectionA = new Float32Array(2);
let ProjectionB = new Float32Array(2);
let Correction = new Float32Array(2);

export function RegisterPolygonCollider(collider, vertices) {
    let length = vertices.length,
        index = 0;

    if (ColliderCount + length > MAX_COLLIDERS) {
        return null;
    }

    collider.verticesX = SystemPColliderDataX.subarray(ColliderCount, ColliderCount + length);
    collider.verticesY = SystemPColliderDataY.subarray(ColliderCount, ColliderCount + length);

    for (; index < length; ++index) {
        collider.verticesX[index] = vertices[index][0];
        collider.verticesY[index] = vertices[index][1];
    }
    collider.ID = ColliderCount;
    ColliderCount += length;
    return collider;
}

export function Collide(bodyA, bodyB, callback) {
    if (!bodyA.immovable && !bodyB.immovable) {
        SystemDPolyToDPolyCollisionReqA[SystemDPolyToDPolyCollisionReqSize] = bodyA.ID;
        SystemDPolyToDPolyCollisionReqA[SystemDPolyToDPolyCollisionReqSize + 1] = bodyA.collider.ID;
        SystemDPolyToDPolyCollisionReqA[SystemDPolyToDPolyCollisionReqSize + 2] = bodyA.collider.verticesX.length;

        SystemDPolyToDPolyCollisionReqB[SystemDPolyToDPolyCollisionReqSize] = bodyB.ID;
        SystemDPolyToDPolyCollisionReqB[SystemDPolyToDPolyCollisionReqSize + 1] = bodyB.collider.ID;
        SystemDPolyToDPolyCollisionReqB[SystemDPolyToDPolyCollisionReqSize + 2] = bodyB.collider.verticesX.length;
        SystemDPolyToDPolyCollisionReqSize += 3;
    } else if (bodyA.immovable && !bodyB.immovable) {
        SystemSPolyToDPolyCollisionReqA[SystemSPolyToDPolyCollisionReqSize] = bodyA.ID;
        SystemSPolyToDPolyCollisionReqA[SystemSPolyToDPolyCollisionReqSize + 1] = bodyA.collider.ID;
        SystemSPolyToDPolyCollisionReqA[SystemSPolyToDPolyCollisionReqSize + 2] = bodyA.collider.verticesX.length;

        SystemSPolyToDPolyCollisionReqB[SystemSPolyToDPolyCollisionReqSize] = bodyB.ID;
        SystemSPolyToDPolyCollisionReqB[SystemSPolyToDPolyCollisionReqSize + 1] = bodyB.collider.ID;
        SystemSPolyToDPolyCollisionReqB[SystemSPolyToDPolyCollisionReqSize + 2] = bodyB.collider.verticesX.length;
        SystemSPolyToDPolyCollisionReqSize += 3;
    } else if (!bodyA.immovable && bodyB.immovable) {
        SystemSPolyToDPolyCollisionReqA[SystemSPolyToDPolyCollisionReqSize] = bodyB.ID;
        SystemSPolyToDPolyCollisionReqA[SystemSPolyToDPolyCollisionReqSize + 1] = bodyB.collider.ID;
        SystemSPolyToDPolyCollisionReqA[SystemSPolyToDPolyCollisionReqSize + 2] = bodyB.collider.verticesX.length;

        SystemSPolyToDPolyCollisionReqB[SystemSPolyToDPolyCollisionReqSize] = bodyA.ID;
        SystemSPolyToDPolyCollisionReqB[SystemSPolyToDPolyCollisionReqSize + 1] = bodyA.collider.ID;
        SystemSPolyToDPolyCollisionReqB[SystemSPolyToDPolyCollisionReqSize + 2] = bodyA.collider.verticesX.length;
        SystemSPolyToDPolyCollisionReqSize += 3;
    } else {
        return;
    }
    // TODO: Check if it runs better if we init with empty function.
    SystemCollisionRequestCallback[SystemCollisionRequestCallbackSize++] = callback;
}

function SolveDynamicPolygonToDynamicPolygonCollision(
    globalPositionX,
    globalPositionY,
    globalVelocityX,
    globalVelocityY,
    globalBounceX,
    globalBounceY,
    globalFrictionX,
    globalFrictionY,
    globalMass) {
    let index = 0,
        length = SystemDPolyToDPolyCollisionReqSize,
        startA = 0,
        endA = 0,
        startB = 0,
        endB = 0,
        Sqrt = Math.sqrt,
        Abs = Math.abs,
        aID = 0,
        bID = 0,
        nv1 = 0.0,
        nv2 = 0.0,
        avg = 0.0;

    for (; index < length; index += 3) {

        startA = SystemDPolyToDPolyCollisionReqA[index + 1];
        endA = startA + SystemDPolyToDPolyCollisionReqA[index + 2];
        startB = SystemDPolyToDPolyCollisionReqB[index + 1];
        endB = startB + SystemDPolyToDPolyCollisionReqB[index + 2];
        aID = SystemDPolyToDPolyCollisionReqA[index];
        bID = SystemDPolyToDPolyCollisionReqB[index];

        if (DODPolygonToPolygonCorrection(
                aID,
                startA,
                SystemDPolyToDPolyCollisionReqA[index + 2],
                bID,
                startB,
                SystemDPolyToDPolyCollisionReqB[index + 2],
                globalPositionX,
                globalPositionY)) {

            globalPositionX[aID] -= Correction[0];
            globalPositionX[bID] += Correction[0];
            globalPositionY[aID] -= Correction[1];
            globalPositionY[bID] += Correction[1];

            nv1 = ((globalVelocityX[bID] * globalVelocityX[aID] * globalMass[bID]) / globalMass[aID]) * 1000;
            // Get abs value
            nv1 = ((nv1 ^ (nv1 >> 31)) - (nv1 >> 31)) / 1000;
            nv1 = Sqrt(nv1);
            // Multiply by sign
            nv1 *= (~((globalVelocityX[bID] >> 31) & 1) + 1) | (((~globalVelocityX[bID] + 1) >> 31) & 1);
            nv2 = ((globalVelocityX[aID] * globalVelocityX[bID] * globalMass[aID]) / globalMass[bID]) * 1000;
            // Get abs value
            nv2 = ((nv2 ^ (nv2 >> 31)) - (nv2 >> 31)) / 1000;
            nv2 = Sqrt(nv2);
            // Multiply by sign
            nv2 *= (~((globalVelocityX[aID] >> 31) & 1) + 1) | (((~globalVelocityX[aID] + 1) >> 31) & 1);
            avg = (nv1 + nv2) * 0.5;
            nv1 -= avg;
            nv2 -= avg;
            globalVelocityX[aID] = avg + nv1 * globalBounceX[aID];
            globalVelocityX[bID] = avg + nv2 * globalBounceX[bID];

            nv1 = ((globalVelocityY[bID] * globalVelocityY[aID] * globalMass[bID]) / globalMass[aID]) * 1000;
            // Get abs value
            nv1 = ((nv1 ^ (nv1 >> 31)) - (nv1 >> 31)) / 1000;
            nv1 = Sqrt(nv1);
            // Multiply by sign
            nv1 *= (~((globalVelocityY[bID] >> 31) & 1) + 1) | (((~globalVelocityY[bID] + 1) >> 31) & 1);
            nv2 = ((globalVelocityY[aID] * globalVelocityY[bID] * globalMass[aID]) / globalMass[bID]) * 1000;
            // Get abs value
            nv2 = ((nv2 ^ (nv2 >> 31)) - (nv2 >> 31)) / 1000;
            nv2 = Sqrt(nv2);
            // Multiply by sign
            nv2 *= (~((globalVelocityY[aID] >> 31) & 1) + 1) | (((~globalVelocityY[aID] + 1) >> 31) & 1);
            avg = (nv1 + nv2) * 0.5;
            nv1 -= avg;
            nv2 -= avg;
            globalVelocityY[aID] = avg + nv1 * globalBounceY[aID];
            globalVelocityY[bID] = avg + nv2 * globalBounceY[bID];

            Correction[0] = 0;
            Correction[1] = 0;
            // Pass the callback
            SystemCollisionValidCallback[SystemCollisionValidCallbackSize++] = SystemCollisionRequestCallback[(index / 3) | 0];
        }
    }
    SystemDPolyToDPolyCollisionReqSize = 0;
}

function SolveStaticPolygonToDynamicPolygonCollision(
    globalPositionX,
    globalPositionY,
    globalVelocityX,
    globalVelocityY,
    globalBounceX,
    globalBounceY,
    globalFrictionX,
    globalFrictionY,
    globalMass) {
    let index = 0,
        length = SystemSPolyToDPolyCollisionReqSize,
        startA = 0,
        endA = 0,
        startB = 0,
        endB = 0,
        Sqrt = Math.sqrt,
        Abs = Math.abs,
        aID = 0,
        bID = 0,
        nv1 = 0.0,
        nv2 = 0.0,
        avg = 0.0;
    //debugger;
    for (; index < length; index += 3) {

        startA = SystemSPolyToDPolyCollisionReqA[index + 1];
        endA = startA + SystemSPolyToDPolyCollisionReqA[index + 2];
        startB = SystemSPolyToDPolyCollisionReqB[index + 1];
        endB = startB + SystemSPolyToDPolyCollisionReqB[index + 2];
        aID = SystemSPolyToDPolyCollisionReqA[index];
        bID = SystemSPolyToDPolyCollisionReqB[index];

        if (DODPolygonToPolygonCorrection(
                aID,
                startA,
                SystemSPolyToDPolyCollisionReqA[index + 2],
                bID,
                startB,
                SystemSPolyToDPolyCollisionReqB[index + 2],
                globalPositionX,
                globalPositionY)) {

            if (Correction[0] < Correction[1]) {
                globalPositionX[bID] += Correction[0];
                globalVelocityX[bID] = globalVelocityX[aID] - globalVelocityX[bID] * globalBounceX[bID];
            } else {
                globalPositionY[bID] += Correction[1];
                globalVelocityY[bID] = globalVelocityY[aID] - globalVelocityY[bID] * globalBounceY[bID];
            }


            Correction[0] = 0;
            Correction[1] = 0;
            // Pass the callback
            SystemCollisionValidCallback[SystemCollisionValidCallbackSize++] = SystemCollisionRequestCallback[(index / 3) | 0];
        }
    }
    SystemSPolyToDPolyCollisionReqSize = 0;
}

export function RunCollisionFrame() {
    let globalPositionX = GetBodiesPositionX(),
        globalPositionY = GetBodiesPositionY(),
        globalVelocityX = GetBodiesVelocityX(),
        globalVelocityY = GetBodiesVelocityY(),
        globalBounceX = GetBodiesBounceX(),
        globalBounceY = GetBodiesBounceY(),
        globalFrictionX = GetBodiesFrictionX(),
        globalFrictionY = GetBodiesFrictionY(),
        globalMass = GetBodiesMass();

    SolveDynamicPolygonToDynamicPolygonCollision(
        globalPositionX,
        globalPositionY,
        globalVelocityX,
        globalVelocityY,
        globalBounceX,
        globalBounceY,
        globalFrictionX,
        globalFrictionY,
        globalMass
    );
    SolveStaticPolygonToDynamicPolygonCollision(
        globalPositionX,
        globalPositionY,
        globalVelocityX,
        globalVelocityY,
        globalBounceX,
        globalBounceY,
        globalFrictionX,
        globalFrictionY,
        globalMass
    );
    SystemCollisionRequestCallbackSize = 0;
}

export function EmitCollisionCallbacks() {
    let length = SystemCollisionValidCallbackSize,
        index = 0;

    for (; index < length; ++index) {
        if (SystemCollisionValidCallback[index])
            SystemCollisionValidCallback[index]();
    }
    SystemCollisionValidCallbackSize = 0;
}

// Init SystemCollisionQueueData
for (let index = 0; index < SystemDPolyToDPolyCollisionReqA.length; ++index) {
    SystemDPolyToDPolyCollisionReqA[index] = 0;
    SystemDPolyToDPolyCollisionReqB[index] = 0;
}

const MAX_NUM = Number.MAX_VALUE;
const Abs = Math.abs;


// DOD SAT version
function DODPolygonToPolygonCorrection(aID, fromA, lengthA, bID, fromB, lengthB, globalPositionX, globalPositionY) {
    let axesAIndex = DODGetNormalizedPolygonAxes(aID, fromA, lengthA, globalPositionX, globalPositionY);
    let axesBIndex = DODGetNormalizedPolygonAxes(bID, fromB, lengthB, globalPositionX, globalPositionY);
    let unitVectorX = 0;
    let unitVectorY = 0;
    let index = 0;
    let axisX = 0.0;
    let axisY = 0.0;
    let distance = 0.0;
    let projectionDistanceA = 0.0;
    let projectionDistanceB = 0.0;
    let absoluteDistance = 0.0;
    let correctionOverlap = MAX_NUM;
    let Abs = Math.abs;

    for (; index < lengthA; ++index) {
        distance = 0.0;
        absoluteDistance = 0.0;
        axisX = NormalsPoolX[axesAIndex + index];
        axisY = NormalsPoolY[axesAIndex + index];
        DODGetProjectionRange(aID, fromA, lengthA, axisX, axisY, ProjectionA, globalPositionX, globalPositionY);
        DODGetProjectionRange(bID, fromB, lengthB, axisX, axisY, ProjectionB, globalPositionX, globalPositionY);

        if (ProjectionA[0] > ProjectionB[1] || ProjectionB[0] > ProjectionA[1])
            return false;

        if (ProjectionA[0] < ProjectionB[0] &&
            ProjectionA[1] < ProjectionB[1]) {
            distance = ProjectionA[1] - ProjectionB[0];
        } else if (ProjectionA[1] > ProjectionB[1]) {
            distance = ProjectionA[0] - ProjectionB[1];
        } else {
            projectionDistanceA = ProjectionA[1] - ProjectionB[0];
            projectionDistanceB = ProjectionB[1] - ProjectionA[0];
            if (projectionDistanceA < projectionDistanceB) {
                distance = projectionDistanceA;
            } else {
                distance = -projectionDistanceB;
            }
        }
        absoluteDistance = Abs(distance);
        if (absoluteDistance < correctionOverlap) {
            correctionOverlap = absoluteDistance;
            unitVectorX = axisX;
            unitVectorY = axisY;
            if (distance < 0) {
                unitVectorX = -unitVectorY;
                unitVectorY = -unitVectorY;
            }
        }
    }

    for (index = 0; index < lengthB; ++index) {
        distance = 0.0;
        absoluteDistance = 0.0;
        axisX = NormalsPoolX[axesBIndex + index];
        axisY = NormalsPoolY[axesBIndex + index];
        DODGetProjectionRange(aID, fromA, lengthA, axisX, axisY, ProjectionA, globalPositionX, globalPositionY);
        DODGetProjectionRange(bID, fromB, lengthB, axisX, axisY, ProjectionB, globalPositionX, globalPositionY);

        if (ProjectionA[0] > ProjectionB[1] || ProjectionB[0] > ProjectionA[1])
            return false;

        if (ProjectionA[0] < ProjectionB[0] &&
            ProjectionA[1] < ProjectionB[1]) {
            distance = ProjectionA[1] - ProjectionB[0];
        } else if (ProjectionA[1] > ProjectionB[1]) {
            distance = ProjectionA[0] - ProjectionB[1];
        } else {
            projectionDistanceA = ProjectionA[1] - ProjectionB[0];
            projectionDistanceB = ProjectionB[1] - ProjectionA[0];
            if (projectionDistanceA < projectionDistanceB) {
                distance = projectionDistanceA;
            } else {
                distance = -projectionDistanceB;
            }
        }
        absoluteDistance = Abs(distance);
        if (absoluteDistance < correctionOverlap) {
            correctionOverlap = absoluteDistance;
            unitVectorX = axisX;
            unitVectorY = axisY;
            if (distance < 0) {
                unitVectorX = -unitVectorY;
                unitVectorY = -unitVectorY;
            }
        }
    }
    Correction[0] = unitVectorX * correctionOverlap;
    Correction[1] = unitVectorY * correctionOverlap;
    NormalsPoolUsed = 0;
    return true;
}

function DODGetNormalizedPolygonAxes(id, start, length, globalPositionX, globalPositionY) {
    let index = 0,
        oldX = 0.0,
        vecAX = 0.0,
        vecAY = 0.0,
        vecBX = 0.0,
        vecBY = 0.0,
        edgeX = 0.0,
        edgeY = 0.0,
        normalsIndex = NormalsPoolUsed,
        Sqrt = Math.sqrt,
        norm = 0.0,
        x = globalPositionX[id],
        y = globalPositionY[id];

    for (; index < length - 1; ++index) {
        vecAX = x + SystemPColliderDataX[start + index];
        vecAY = y + SystemPColliderDataY[start + index];
        vecBX = x + SystemPColliderDataX[start + index + 1];
        vecBY = y + SystemPColliderDataY[start + index + 1];
        edgeX = vecBY - vecAY;
        edgeY = -(vecBX - vecAX);
        norm = edgeX * edgeX + edgeY * edgeY;
        if (norm > 0) {
            norm = 1 / Sqrt(norm);
            edgeX *= norm;
            edgeY *= norm;
        }
        NormalsPoolX[NormalsPoolUsed] = edgeX;
        NormalsPoolY[NormalsPoolUsed++] = edgeY;
    }
    vecAX = x + SystemPColliderDataX[start + length - 1];
    vecAY = y + SystemPColliderDataY[start + length - 1];
    vecBX = x + SystemPColliderDataX[start];
    vecBY = y + SystemPColliderDataY[start];
    edgeX = vecBY - vecAY;
    edgeY = -(vecBX - vecAX);
    norm = edgeX * edgeX + edgeY * edgeY;
    if (norm > 0) {
        norm = 1 / Sqrt(norm);
        edgeX *= norm;
        edgeY *= norm;
    }
    NormalsPoolX[NormalsPoolUsed] = edgeX;
    NormalsPoolY[NormalsPoolUsed++] = edgeY;
    return normalsIndex;
}

function DODGetProjectionRange(id, start, length, axisX, axisY, container, globalPositionX, globalPositionY) {
    let resultX = 0.0;
    let resultY = 0.0;
    let minp = MAX_NUM;
    let maxp = -MAX_NUM;
    let index = 0;
    let dotValue = 0.0;
    let x = globalPositionX[id];
    let y = globalPositionY[id];

    for (; index < length; ++index) {
        dotValue = (x + SystemPColliderDataX[start + index]) * axisX;
        dotValue += (y + SystemPColliderDataY[start + index]) * axisY;
        dotValue *= 1000;
        minp = dotValue ^ ((minp ^ dotValue) & -(minp < dotValue));
        maxp = maxp ^ ((maxp ^ dotValue) & -(maxp < dotValue));
    }
    container[0] = minp / 1000;
    container[1] = maxp / 1000;
}