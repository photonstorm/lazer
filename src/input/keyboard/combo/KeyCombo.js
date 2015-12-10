//  Keys can be either:
//  
//  A string (ATARI)
//  An array of either integers (key codes) or strings, or a mixture of both
//  An array of objects (such as Key objects) with a public 'keyCode' property

export default function KeyCombo (keys, { resetOnWrongKey = true, maxKeyDelay = 0, resetOnMatch = false } = {}) {

    //  Can't have a zero or single length combo (string or array based)
    if (keys.length < 2)
    {
        return false;
    }

    let codes = [];

    //  if 'keys' is a string we need to get the keycode of each character in it

    for (let i = 0; i < keys.length; i++)
    {
        let char = keys[i];

        if (typeof char === 'string')
        {
            codes.push(char.toUpperCase().charCodeAt(0));
        }
        else if (typeof char === 'number')
        {
            codes.push(char);
        }
        else if (char.hasOwnProperty('keyCode'))
        {
            codes.push(char.keyCode);
        }
    }

    return {

        keyCodes: codes,

        //  The current keyCode the combo is waiting for
        current: codes[0],

        //  The current index of the key being waited for in the 'keys' string
        index: 0,

        //  The length of this combo (in keycodes)
        size: codes.length,

        //  The time the previous key in the combo was matched
        timeLastMatched: 0,

        //  Has this Key Combo been matched yet?
        matched: false,

        //  The time the entire combo was matched
        timeMatched: 0,

        //  Custom options ...

        //  If they press the wrong key do we reset the combo?
        resetOnWrongKey: resetOnWrongKey,

        //  The max delay in ms between each key press. Above this the combo is reset. 0 means disabled.
        maxKeyDelay: maxKeyDelay,

        //  If previously matched and they press Key 1 again, will it reset?
        resetOnMatch: resetOnMatch

    };

}