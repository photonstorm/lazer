
export default function ProcessKeyCombo (event, combo) {

    let matched = false;
    let keyMatched = false;

    if (combo.matched)
    {
        return true;
    }

    if (event.keyCode === combo.current)
    {
        //  Key was correct
        let duration = event.timeStamp - combo.timeLastMatched;

        //  We have to check to see if the delay between
        //  the new key and the old one was too long (if enabled)

        if (combo.index > 0 && combo.maxKeyDelay > 0 && (duration >= combo.maxKeyDelay))
        {
            keyMatched = true;
        }
    }
    else
    {
        //  Wrong key was pressed
        if (combo.resetOnWrongKey)
        {
            combo.index = 0;
            combo.current = combo.codes[0];
        }
    }

    if (matched)
    {
        combo.timeLastMatched = event.timeStamp;
        combo.matched = true;
        combo.timeMatched = event.timeStamp;
    }

    return matched;

}
