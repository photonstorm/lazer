import XHRSettings from './XHRSettings.js';

//  Takes two XHR Objects and creates a new object

//  The new object is based on global initially, but any setting in
//  local overrides the global value.

export default function MergeXHRSettings (global, local) {

    let output = (global === undefined) ? XHRSettings() : Object.assign(global);

    if (local)
    {
        for (let setting in local)
        {
            if (local[setting] !== undefined)
            {
                output[setting] = local[setting];
            }
        }
    }

    return output;

}
