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
    BodyDataRotation
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
import {
    PolygonColliderCount,
    PolygonDataX,
    PolygonDataY,
    PolygonDataMeta
} from 'physics/arcade/collider/PolygonCollider.js'

// Polygon to Polygon Dynamic-Dymamic Collision Request Data.
let PolygonDynamicSize = 0;
let PolygonDynamicA = new Uint16Array(MAX_COLLIDERS * 3);
let PolygonDynamicB = new Uint16Array(MAX_COLLIDERS * 3);

// Polygon to Polygon Static-Dymamic Collision Request Data.
let PolygonStaticSize = 0;
let PolygonStaticA = new Uint16Array(MAX_COLLIDERS * 3);
let PolygonStaticB = new Uint16Array(MAX_COLLIDERS * 3);

// Polygon to Polygon Overlap Request Data.
let PolygonOverlapSize = 0;
let PolygonOverlapA = new Uint16Array(MAX_COLLIDERS * 3);
let PolygonOverlapB = new Uint16Array(MAX_COLLIDERS * 3);

const Sqrt = Math.sqrt;
const Cos = Math.cos;
const Sin = Math.sin;

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
        PolygonDynamicSize += 3;
        // Register Callback
        RegisterCallbackCollision(callback);
    } else if (immovableA && !immovableB) {
        // Store Body ID
        PolygonStaticA[PolygonStaticSize] = bodyA.ID;
        // Store Collider ID
        PolygonStaticA[PolygonStaticSize + 1] = bodyA.collider.ID;
        // Store Polygon Vertex Count
        PolygonStaticA[PolygonStaticSize + 2] = bodyA.collider.vertexCount;
        PolygonStaticB[PolygonStaticSize] = bodyB.ID;
        PolygonStaticB[PolygonStaticSize + 1] = bodyB.collider.ID;
        PolygonStaticB[PolygonStaticSize + 2] = bodyB.collider.vertexCount;
        PolygonStaticSize += 3;
        RegisterCallbackCollision(callback);
    } else if (immovableB && !immovableA) {
        // Store Body ID
        PolygonStaticA[PolygonStaticSize] = bodyB.ID;
        // Store Collider ID
        PolygonStaticA[PolygonStaticSize + 1] = bodyB.collider.ID;
        // Store Polygon Vertex Count
        PolygonStaticA[PolygonStaticSize + 2] = bodyB.collider.vertexCount;
        PolygonStaticB[PolygonStaticSize] = bodyA.ID;
        PolygonStaticB[PolygonStaticSize + 1] = bodyA.collider.ID;
        PolygonStaticB[PolygonStaticSize + 2] = bodyA.collider.vertexCount;
        PolygonStaticSize += 3;
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
    UpdateColliderData();
    SolvePolygonOverlap();
    SolveDynamicPolygonCollision();
    SolveStaticPolygonCollision();
    UpdateCallbacks();
}

function UpdateColliderData() {
    let index = 0;
    let vertexCount = 0;
    let colliderID = 0;
    let ownerID = 0;
    let rotation = 0;
    let indexVertex = 0;
    let x = 0.0;
    let y = 0.0;
    let cosA = 0.0;
    let sinA = 0.0;
    for (index; index < PolygonColliderCount; index += 3) {
        ownerID = PolygonDataMeta[index + 2];
        rotation = BodyDataRotation[ownerID];
        if (rotation == 0.0)
            continue;
        vertexCount = PolygonDataMeta[index];
        colliderID = PolygonDataMeta[index + 1];
        cosA = Cos(rotation);
        sinA = Sin(rotation);
        for (indexVertex = 0; indexVertex < vertexCount; ++indexVertex) {
            x = PolygonDataX[colliderID + indexVertex];
            y = PolygonDataY[colliderID + indexVertex];
            PolygonDataX[colliderID + indexVertex] = x * cosA - y * sinA;
            PolygonDataY[colliderID + indexVertex] = x * sinA + y * cosA;
        }
    }
}

function SolveDynamicPolygonCollision() {
    let index = 0;
    let length = PolygonDynamicSize;
    let testCount = 0;
    let aID = 0;
    let aPolygonID = 0;
    let aVertexCount = 0;
    let bID = 0;
    let bPolygonID = 0;
    let bVertexCount = 0;
    let correctionX = 0.0;
    let correctionY = 0.0;
    let unitX = 0.0;
    let unitY = 0.0;
    let mass1 = 0.0;
    let mass2 = 0.0;
    let vx = 0.0;
    let vy = 0.0;
    let ux = 0.0;
    let uy = 0.0;
    let dot = 0.0;
    let dx = 0.0;
    let dy = 0.0;

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
    for (index = 0; index < CollideCount; index += 8) {
        // Bounce bodies based on the normal of the edges colliding.
        aID = CollideData[index];
        bID = CollideData[index + 1];
        unitY = CollideData[index + 6];
        unitX = CollideData[index + 5];
        correctionX = CollideData[index + 3] + unitX;
        correctionY = CollideData[index + 4] + unitY;

        BodyDataPositionX[aID] -= correctionX;
        BodyDataPositionX[bID] += correctionX;
        BodyDataPositionY[aID] -= correctionY;
        BodyDataPositionY[bID] += correctionY;

        vx = BodyDataVelocityX[aID];
        vy = BodyDataVelocityY[aID];
        mass1 = BodyDataMass[aID];
        mass2 = BodyDataMass[bID];

        ux = unitX;
        uy = unitY;
        dot = vx * ux + vy * uy;
        ux *= dot;
        uy *= dot;
        dx = vx - ux;
        dy = vy - uy;
        dx -= ux;
        dy -= uy;
        dx -= (vx * BodyDataBounceX[aID] * mass2) / mass1;
        dy -= (vy * BodyDataBounceY[aID] * mass2) / mass1;

        BodyDataVelocityX[aID] += dx;
        BodyDataVelocityY[aID] += dy;

        vx = BodyDataVelocityX[bID];
        vy = BodyDataVelocityY[bID];
        ux = unitX;
        uy = unitY;
        dot = vx * ux + vy * uy;
        ux *= dot;
        uy *= dot;
        dx = vx - ux;
        dy = vy - uy;
        dx -= ux;
        dy -= uy;
        dx -= (vx * BodyDataBounceX[bID] * mass1) / mass2;
        dy -= (vy * BodyDataBounceY[bID] * mass1) / mass2;

        BodyDataVelocityX[bID] += dx;
        BodyDataVelocityY[bID] += dy;
    }
    for (index = 0; index < CollideCount; index += 5) {
        EmitCallbackCollision(CollideData[index + 2], CollideData[index], CollideData[index + 1]);
    }
    PolygonDynamicSize = 0;
    ResetCollide();
}

function SolveStaticPolygonCollision() {
    let index = 0;
    let length = PolygonStaticSize;
    let testCount = 0;
    let aID = 0;
    let aPolygonID = 0;
    let aVertexCount = 0;
    let bID = 0;
    let bPolygonID = 0;
    let bVertexCount = 0;
    let correctionX = 0.0;
    let correctionY = 0.0;
    let mass1 = 0.0;
    let mass2 = 0.0;
    let vx = 0.0;
    let vy = 0.0;
    let ux = 0.0;
    let uy = 0.0;
    let dot = 0.0;
    let dx = 0.0;
    let dy = 0.0;

    for (; index < length; index += 3) {
        aID = PolygonStaticA[index];
        aPolygonID = PolygonStaticA[index + 1];
        aVertexCount = PolygonStaticA[index + 2];

        bID = PolygonStaticB[index];
        bPolygonID = PolygonStaticB[index + 1];
        bVertexCount = PolygonStaticB[index + 2];

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
    for (index = 0; index < CollideCount; index += 8) {
        // Bounce bodies based on the normal of the edges colliding.
        aID = CollideData[index];
        bID = CollideData[index + 1];
        mass1 = BodyDataMass[aID];
        mass2 = BodyDataMass[bID];
        ux = CollideData[index + 5];
        uy = CollideData[index + 6];
        correctionX = CollideData[index + 3] + ux;
        correctionY = CollideData[index + 4] + uy;
        vx = BodyDataVelocityX[bID];
        vy = BodyDataVelocityY[bID];
        dot = vx * ux + vy * uy;
        ux *= dot;
        uy *= dot;
        dx = vx - ux;
        dy = vy - uy;
        dx -= ux;
        dy -= uy;
        dx -= (vx * BodyDataBounceX[bID] * mass1) / mass2;
        dy -= (vy * BodyDataBounceY[bID] * mass1) / mass2;
        BodyDataVelocityX[bID] += dx;
        BodyDataVelocityY[bID] += dy;
        BodyDataPositionX[bID] += correctionX;
        BodyDataPositionY[bID] += correctionY;
    }
    for (index = 0; index < CollideCount; index += 5) {
        EmitCallbackCollision(CollideData[index + 2], CollideData[index], CollideData[index + 1]);
    }
    PolygonStaticSize = 0;
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