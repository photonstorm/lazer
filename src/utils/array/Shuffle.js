/**
* A standard Fisher-Yates Array shuffle implementation which modifies the array in place.
*
* @method
* @param {any[]} array - The array to shuffle.
* @return {any[]} The original array, now shuffled.
*/
export default function Shuffle (array) {

    for (let i = array.length - 1; i > 0; i--)
    {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;

}
