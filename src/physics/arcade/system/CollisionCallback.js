import {
    MAX_COLLIDERS
} from 'physics/arcade/Constants.js'

let ValidCallbackSize = 0;
let RequestCallbackSize = 0;
let RequestCallbackArray = new Array(MAX_COLLIDERS);
let ValidCallbackArray = new Array(MAX_COLLIDERS);

export function RegisterCallback(callback) {
    RequestCallbackArray[RequestCallbackSize] = callback;
    return RequestCallbackSise++;
}

export function EmitCallback(callbackID) {
    ValidCallbackArray[ValidCallbackSize++] = RequestCallbackArray[callbackID];
}

export function UpdateCallbacks() {
    for (let index = 0; index < ValidCallbackSize; ++index) {
        ValidCallbackArray[index]();
    }
    ValidCallbackSize = 0;
    RequestCallbackSize = 0;
}