import {
    MAX_COLLIDERS
} from 'physics/arcade/Constants.js'

let ValidCallbackSize = 0;
let ValidCallbackMembersSize = 0;
let RequestCallbackCollisionSize = 0;
let RequestCallbackOverlapSize = 0;
let RequestCallbackCollisionArray = new Array(MAX_COLLIDERS);
let RequestCallbackOverlapArray = new Array(MAX_COLLIDERS);
let ValidCallbackArray = new Array(MAX_COLLIDERS);
let ValidCallbackMembers = new Uint16Array(MAX_COLLIDERS * 2);

export function RegisterCallbackCollision(callback) {
    RequestCallbackCollisionArray[RequestCallbackCollisionSize] = callback;
    return RequestCallbackCollisionSize++;
}

export function EmitCallbackCollision(callbackID, aID, bID) {
    ValidCallbackArray[ValidCallbackSize++] = RequestCallbackCollisionArray[callbackID];
    ValidCallbackMembers[ValidCallbackMembersSize] = aID;
    ValidCallbackMembers[ValidCallbackMembersSize + 1] = bID;
    ValidCallbackMembersSize += 2;
}

export function RegisterCallbackOverlap(callback) {
    RequestCallbackOverlapArray[RequestCallbackOverlapSize] = callback;
    return RequestCallbackOverlapSize++;
}

export function EmitCallbackOverlap(callbackID, aID, bID) {
    ValidCallbackArray[ValidCallbackSize++] = RequestCallbackOverlapArray[callbackID];
    ValidCallbackMembers[ValidCallbackMembersSize] = aID;
    ValidCallbackMembers[ValidCallbackMembersSize + 1] = bID;
    ValidCallbackMembersSize += 2;
}

export function UpdateCallbacks() {
    let count = 0;
    for (let index = 0; index < ValidCallbackSize; ++index) {
        if (ValidCallbackArray[index])
            ValidCallbackArray[index](ValidCallbackMembers[count], ValidCallbackMembers[count + 1]);
        count += 2;
    }
    ValidCallbackSize = 0;
    ValidCallbackMembersSize = 0;
    RequestCallbackOverlapSize = 0;
    RequestCallbackCollisionSize = 0;
}