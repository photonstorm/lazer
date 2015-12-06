//  Return boolean (true if it reached the end of the combo, false if not)

export default function AdvanceKeyCombo (event, combo) {

    if (combo.index === combo.codes.length - 1)
    {
        return true;
    }
    else
    {
        combo.timeLastMatched = event.timeStamp;
        combo.index++;
        combo.current = combo.codes[index];

        return false;
    }

}
