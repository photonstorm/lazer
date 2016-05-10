let Min = Math.min;
let Max = Math.max;

export default function (vectorA, vectorB) {
    return (Min(vectorA[1], vectorB[1]) - Max(vectorA[0], vectorB[0]));
}