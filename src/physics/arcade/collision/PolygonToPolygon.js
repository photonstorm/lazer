import {
    MAX_COLLIDERS
} from 'physics/arcade/Constants.js'
import {
    PolygonDataX,
    PolygonDataY
} from 'physics/arcade/collider/PolygonCollider.js'

const Sqrt = Math.sqrt;
const Abs = Math.abs;
const MAX_VALUE = Number.MAX_VALUE;

let NormalsPoolX = new Float32Array(MAX_COLLIDERS);
let NormalsPoolY = new Float32Array(MAX_COLLIDERS);
let NormalsPoolSize = 0;

let RangePoolMin = new Float32Array(MAX_COLLIDERS);
let RangePoolMax = new Float32Array(MAX_COLLIDERS);

export let OverlapCount = 0;
export let OverlapData = new Uint16Array(MAX_COLLIDERS * 3);

export let CollideCount = 0;
export let CollideData = new Float32Array(MAX_COLLIDERS * 5);

export function ResetOverlap() {
    OverlapCount = 0;
}

export function ResetCollide() {
    CollideCount = 0;
}


function Normalize(x, y) {
    const lsq = x * x + y * y;
    if (lsq > 0) {
        const lr = 1 / Sqrt(lsq);
        NormalsPoolX[NormalsPoolSize] = x * lr;
        NormalsPoolY[NormalsPoolSize] = y * lr;
    } else {
        NormalsPoolX[NormalsPoolSize] = 0;
        NormalsPoolY[NormalsPoolSize] = 0;
    }
    ++NormalsPoolSize;
}

function GetNormalizedAxes(polygonID, vertexCount, positionX, positionY) {
    let vecAX = 0.0;
    let vecAY = 0.0;
    let vecBX = 0.0;
    let vecBY = 0.0;
    let edgeX = 0.0;
    let edgeY = 0.0;
    let index = 0;
    for (; index < vertexCount - 1; ++index) {
        vecAX = positionX + PolygonDataX[polygonID + index];
        vecBX = positionX + PolygonDataX[polygonID + index + 1];
        vecAY = positionY + PolygonDataY[polygonID + index];
        vecBY = positionY + PolygonDataY[polygonID + index + 1];
        edgeX = vecBY - vecAY;
        edgeY = -(vecBX - vecAX);
        Normalize(edgeX, edgeY);
    }
    vecAX = positionX + PolygonDataX[polygonID + vertexCount - 1];
    vecBX = positionX + PolygonDataX[polygonID + 0];
    vecAY = positionY + PolygonDataY[polygonID + vertexCount - 1];
    vecBY = positionY + PolygonDataY[polygonID + 0];
    edgeX = vecBY - vecAY;
    edgeY = -(vecBX - vecAX);
    Normalize(edgeX, edgeY)
}

function GetRanges(polygonID, vertexCount, positionX, positionY) {
    let min = MAX_VALUE;
    let max = -MAX_VALUE;
    let dot = 0.0;
    let axesIndex = 0;
    let vertexIndex = 0;

    for (; axesIndex < vertexCount; ++axesIndex) {
        for (vertexIndex = 0; vertexIndex < vertexCount; ++vertexIndex) {
            dot = (positionX + PolygonDataX[polygonID + vertexIndex]) * NormalsPoolX[axesIndex];
            dot += (positionY + PolygonDataY[polygonID + vertexIndex]) * NormalsPoolY[axesIndex];
            dot *= 1000;
            min = dot ^ ((min ^ dot) & -(min < dot));
            max = max ^ ((max ^ dot) & -(max < dot));
        }
        RangePoolMin[polygonID + axesIndex] = min / 1000;
        RangePoolMax[polygonID + axesIndex] = max / 1000;
        min = MAX_VALUE;
        max = -MAX_VALUE;
    }
}

export function PolygonToPolygonOverlap(
    // Polygon A
    aID,
    aPositionX,
    aPositionY,
    aPolygonID,
    aVertexCount,
    // Polygon B
    bID,
    bPositionX,
    bPositionY,
    bPolygonID,
    bVertexCount,
    // CallbackID
    callbackID
) {
    let index = 0;
    GetNormalizedAxes(aPolygonID, aVertexCount, aPositionX, aPositionY);
    GetRanges(aPolygonID, aVertexCount, aPositionX, aPositionY);
    GetRanges(bPolygonID, aVertexCount, bPositionX, bPositionY);
    for (; index < aVertexCount; ++index) {
        if (RangePoolMin[aPolygonID + index] > RangePoolMax[bPolygonID + index] ||
            RangePoolMin[bPolygonID + index] > RangePoolMax[aPolygonID + index]) {
            NormalsPoolSize = 0;
            return false;
        }
    }
    NormalsPoolSize = 0;
    GetNormalizedAxes(bPolygonID, bVertexCount, bPositionX, bPositionY);
    GetRanges(aPolygonID, bVertexCount, aPositionX, aPositionY);
    GetRanges(bPolygonID, bVertexCount, bPositionX, bPositionY);
    for (index = 0; index < bVertexCount; ++index) {
        if (RangePoolMin[aPolygonID + index] > RangePoolMax[bPolygonID + index] ||
            RangePoolMin[bPolygonID + index] > RangePoolMax[aPolygonID + index]) {
            NormalsPoolSize = 0;
            return false;
        }
    }
    NormalsPoolSize = 0;
    OverlapData[OverlapCount] = aID;
    OverlapData[OverlapCount + 1] = bID;
    OverlapData[OverlapCount + 2] = callbackID;
    OverlapCount += 3;
    return true;
}

export function PolygonToPolygonCorrection(
    // Polygon A
    aID,
    aPositionX,
    aPositionY,
    aPolygonID,
    aVertexCount,
    // Polygon B
    bID,
    bPositionX,
    bPositionY,
    bPolygonID,
    bVertexCount,
    // CallbackID
    callbackID
) {
    let index = 0;
    let unitX = 0.0;
    let unitY = 0.0;
    let distance = 0.0;
    let absoluteDistance = 0.0;
    let projectionDistanceA = 0.0;
    let projectionDistanceB = 0.0;
    let minA = 0.0;
    let minB = 0.0;
    let maxA = 0.0;
    let maxB = 0.0;
    let correctionOverlap = MAX_VALUE;

    GetNormalizedAxes(aPolygonID, aVertexCount, aPositionX, aPositionY);
    GetRanges(aPolygonID, aVertexCount, aPositionX, aPositionY);
    GetRanges(bPolygonID, aVertexCount, bPositionX, bPositionY);
    for (; index < aVertexCount; ++index) {
        minA = RangePoolMin[aPolygonID + index];
        minB = RangePoolMin[bPolygonID + index];
        maxA = RangePoolMax[aPolygonID + index];
        maxB = RangePoolMax[bPolygonID + index];
        if (minA > maxB || minB > maxA) {
            NormalsPoolSize = 0;
            return false;
        }
        absoluteDistance = 0;
        distance = 0;
        if (minA < minB && maxA < maxB) {
            distance = maxA - minB;
        } else if (maxA > maxB) {
            distance = minA - maxB;
        } else {
            projectionDistanceA = maxA - minB;
            projectionDistanceB = maxB - minA;
            if (projectionDistanceA < projectionDistanceB) {
                distance = projectionDistanceA;
            } else {
                distance = -projectionDistanceB;
            }
        }
        absoluteDistance = Abs(distance);
        if (absoluteDistance < correctionOverlap) {
            correctionOverlap = absoluteDistance;
            unitX = NormalsPoolX[index];
            unitY = NormalsPoolY[index];
            if (distance < 0.0) {
                unitX = -unitX;
                unitY = -unitY;
            }
        }
    }
    NormalsPoolSize = 0;
    GetNormalizedAxes(bPolygonID, bVertexCount, bPositionX, bPositionY);
    GetRanges(aPolygonID, bVertexCount, aPositionX, aPositionY);
    GetRanges(bPolygonID, bVertexCount, bPositionX, bPositionY);
    for (index = 0; index < bVertexCount; ++index) {
        minA = RangePoolMin[aPolygonID + index];
        minB = RangePoolMin[bPolygonID + index];
        maxA = RangePoolMax[aPolygonID + index];
        maxB = RangePoolMax[bPolygonID + index];
        if (minA > maxB || minB > maxA) {
            NormalsPoolSize = 0;
            return false;
        }
        absoluteDistance = 0;
        distance = 0;
        if (minA < minB && maxA < maxB) {
            distance = maxA - minB;
        } else if (maxA > maxB) {
            distance = minA - maxB;
        } else {
            projectionDistanceA = maxA - minB;
            projectionDistanceB = maxB - minA;
            if (projectionDistanceA < projectionDistanceB) {
                distance = projectionDistanceA;
            } else {
                distance = -projectionDistanceB;
            }
        }
        absoluteDistance = Abs(distance);
        if (absoluteDistance < correctionOverlap) {
            correctionOverlap = absoluteDistance;
            unitX = NormalsPoolX[index];
            unitY = NormalsPoolY[index];
            if (distance < 0.0) {
                unitX = -unitX;
                unitY = -unitY;
            }
        }
    }
    NormalsPoolSize = 0;
    CollideData[CollideCount] = aID;
    CollideData[CollideCount + 1] = bID;
    CollideData[CollideCount + 2] = callbackID;
    CollideData[CollideCount + 3] = correctionOverlap * unitX;
    CollideData[CollideCount + 4] = correctionOverlap * unitY;
    CollideCount += 5;
    return true;
}