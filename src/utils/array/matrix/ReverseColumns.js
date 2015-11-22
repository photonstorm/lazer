export default function ReverseColumns (matrix) {

    for (let i = 0; i < matrix.length; i++)
    {
        matrix[i].reverse();
    }

    return matrix;
    
}