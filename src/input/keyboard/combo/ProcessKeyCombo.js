import AdvanceKeyCombo from './AdvanceKeyCombo.js';

export default function ProcessKeyCombo (event, combo) {

    let comboMatched = false;
    let keyMatched = false;

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

            let timeLimit = combo.timeLastMatched + combo.maxKeyDelay;

            //  Check if they pressed it in time or not
            if (event.timeStamp <= timeLimit)
            {
                keyMatched = true;
                comboMatched = AdvanceKeyCombo(event, combo);
            }
        }
        else
        {
            keyMatched = true;

            //  We don't check the time for the first key pressed, so just advance it
            comboMatched = AdvanceKeyCombo(event, combo);
        }
    }

    if (!keyMatched && combo.resetOnWrongKey)
    {
        //  Wrong key was pressed
        combo.index = 0;
        combo.current = combo.keyCodes[0];
    }

    if (comboMatched)
    {
        combo.timeLastMatched = event.timeStamp;
        combo.matched = true;
        combo.timeMatched = event.timeStamp;
    }

    return comboMatched;

}
