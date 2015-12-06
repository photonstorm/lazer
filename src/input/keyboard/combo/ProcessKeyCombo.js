import AdvanceKeyCombo from 'input/keyboard/combo/AdvanceKeyCombo.js';

export default function ProcessKeyCombo (event, combo) {

    let matched = false;

    if (combo.matched)
    {
        return true;
    }

    if (event.keyCode === combo.current)
    {
        //  Key was correct

        if (combo.index > 0 && combo.maxKeyDelay > 0)
        {
            //  We have to check to see if the delay between
            //  the new key and the old one was too long (if enabled)

            let duration = event.timeStamp - combo.timeLastMatched;

            //  Check if they pressed it in time or not
            if (combo.index > 0 && (duration >= combo.maxKeyDelay))
            {
                matched = AdvanceKeyCombo(event, combo);
            }
        }
        else
        {
            //  We don't check the time for the first key pressed, so just advance it
            matched = AdvanceKeyCombo(event, combo);
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
