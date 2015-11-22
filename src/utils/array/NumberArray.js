/**
* Create an array representing the inclusive range of numbers (usually integers) in `[start, end]`.
* This is equivalent to `numberArrayStep(start, end, 1)`.
*
* @method Phaser.ArrayUtils#numberArray
* @param {number} start - The minimum value the array starts with.
* @param {number} end - The maximum value the array contains.
* @return {number[]} The array of number values.
*/
export default function NumberArray (start, end) {

    if (start > end)
    {
        return;
    }

    let result = [];

    for (let i = start; i <= end; i++)
    {
        result.push(i);
    }

    return result;

}
