import {
    MAX_COLLIDERS
} from 'physics/arcade/Constants.js'
import {
    AABBData
} from 'physics/arcade/collider/AABBCollider.js'

let Abs = Math.abs;

export let AABBCollisionData = new Float32Array(MAX_COLLIDERS * 8);
export let AABBCollisionCount = 0;

export let AABBOverlapData = new Uint16Array(MAX_COLLIDERS * 3);
export let AABBOverlapCount = 0;

export function ResetAABBCollision() {
    AABBCollisionCount = 0;
}

export function ResetAABBOverlap() {
    AABBOverlapCount = 0;
}

export function AABBtoAABBOverlap(
    aID, 
    aColliderID,
    aPositionX, 
    aPositionY,
    bID, 
    bColliderID,
    bPositionX, 
    bPositionY,
    callbackID
) {
    let halfWidthA = AABBData[aColliderID + 2] / 2;
    let halfWidthB = AABBData[bColliderID + 2] / 2;
    let halfHeightA = AABBData[aColliderID + 3] / 2;
    let halfHeightB = AABBData[bColliderID + 3] / 2;
    let ax = aPositionX + AABBData[aColliderID];
    let ay = aPositionY + AABBData[aColliderID + 1];
    let bx = bPositionX + AABBData[bColliderID];
    let by = bPositionY + AABBData[bColliderID + 1];
    let distanceX = (bx + halfWidthB) - (ax + halfWidthA);
    let distanceY = (by + halfHeightB) - (ay + halfHeightA);
    
    if (halfWidthA + halfWidthB - Abs(distanceX) < 0 ||
        halfHeightA + halfHeightB - Abs(distanceY) < 0)
        return false;

    AABBOverlapData[AABBOverlapCount] = aID;
    AABBOverlapData[AABBOverlapCount + 1] = bID;
    AABBOverlapData[AABBOverlapCount + 2] = callbackID;
    AABBOverlapCount += 3;
    return true;
}

export function AABBtoAABBCorrection(
    aID, 
    aColliderID,
    aPositionX, 
    aPositionY,
    bID, 
    bColliderID,
    bPositionX, 
    bPositionY,
    callbackID
) {
    let halfWidthA = AABBData[aColliderID + 2] / 2;
    let halfWidthB = AABBData[bColliderID + 2] / 2;
    let halfHeightA = AABBData[aColliderID + 3] / 2;
    let halfHeightB = AABBData[bColliderID + 3] / 2;
    let ax = aPositionX + AABBData[aColliderID];
    let ay = aPositionY + AABBData[aColliderID + 1];
    let bx = bPositionX + AABBData[bColliderID];
    let by = bPositionY + AABBData[bColliderID + 1];
    let distanceX = (bx + halfWidthB) - (ax + halfWidthA);
    let distanceY = (by + halfHeightB) - (ay + halfHeightA);
    let unitVectorX = 0;
    let unitVectorY = 0;
    let correctionVectorX = 0;
    let correctionVectorY = 0;
    let overlapFactor = 0;
    let overlapX = halfWidthA + halfWidthB - Abs(distanceX);
    let overlapY = halfHeightA + halfHeightB - Abs(distanceY);

    if (overlapX < 0 || overlapY < 0) {
        return false;
    }
    if (overlapX < overlapY) {
        unitVectorX = distanceX > 0 ? 1 : -1;
        unitVectorY = 0;
        correctionVectorX = unitVectorX * overlapX;
        correctionVectorY = 0;
        overlapFactor = overlapX;
    } else {
        unitVectorX = 0;
        unitVectorY = distanceY > 0 ? 1 : -1;
        correctionVectorX = 0;
        correctionVectorY = unitVectorY * overlapY;
        overlapFactor = overlapY;
    }
    AABBCollisionData[AABBCollisionCount] = aID;
    AABBCollisionData[AABBCollisionCount + 1] = bID;
    AABBCollisionData[AABBCollisionCount + 2] = callbackID;
    AABBCollisionData[AABBCollisionCount + 3] = correctionVectorX;
    AABBCollisionData[AABBCollisionCount + 4] = correctionVectorY;
    AABBCollisionData[AABBCollisionCount + 5] = unitVectorX;
    AABBCollisionData[AABBCollisionCount + 6] = unitVectorY;
    AABBCollisionData[AABBCollisionCount + 7] = overlapFactor;
    AABBCollisionCount += 8;
    return true;
}