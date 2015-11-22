export default function CheckMatrix (matrix) {

    if (!Array.isArray(matrix) || matrix.length < 2 || !Array.isArray(matrix[0]))
    {
        return false;
    }

    //  How long is the first row?
    const size = matrix[0].length;

    //  Validate the rest of the rows are the same length
    for (let row of matrix)
    {
        if (row.length !== size)
        {
            return false;
        }
    }

    return true;
    
}
