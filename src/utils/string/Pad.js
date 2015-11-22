//  Pad out the given string (val) to the 'amt' number of characters using 'ch' as the extra characters
//  if the string needs padding

export default function Pad (val, amt, ch = ' ') {

    let str = val

    const max = Math.abs(amt);

    while (str.length < max)
    {
        if (amt < 0)
        {
            str += ch;
        }
        else
        {
            str = ch + str;
        }
    }

    return str;

}
