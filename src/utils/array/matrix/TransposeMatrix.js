/**
* Transposes the elements of the given matrix (array of arrays).
* The transpose of a matrix is a new matrix whose rows are the columns of the original.
*
* @method
* @param {Array<any[]>} array - The matrix to transpose.
* @return {Array<any[]>} A new transposed matrix
*/
export default function TransposeMatrix (array) {

    const sourceRowCount = array.length;
    const sourceColCount = array[0].length;

    let result = new Array(sourceColCount);

    for (let i = 0; i < sourceColCount; i++)
    {
        result[i] = new Array(sourceRowCount);

        for (let j = sourceRowCount - 1; j > -1; j--)
        {
            result[i][j] = array[j][i];
        }
    }

    return result;

}
