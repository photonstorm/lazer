/**
 * Check for Little or Big Endian systems.
 *
 * @method 
 * @author Matt DesLauriers (@mattdesl)
 * @return {boolean} true if little endian, false if big endian, null if could not determine.
 */
export default function () {

    const a = new ArrayBuffer(4);
    const b = new Uint8Array(a);
    const c = new Uint32Array(a);

    b[0] = 0xa1;
    b[1] = 0xb2;
    b[2] = 0xc3;
    b[3] = 0xd4;

    if (c[0] === 0xd4c3b2a1)
    {
        return true;
    }

    if (c[0] === 0xa1b2c3d4)
    {
        return false;
    }
    else
    {
        //  Could not determine endianness
        return null;
    }

}
