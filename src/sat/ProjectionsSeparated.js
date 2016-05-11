export default function (intervalA, intervalB) {
    return (intervalA[0] > intervalB[1] || intervalB[0] > intervalA[1]);
}