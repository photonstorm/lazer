export default function (intervalA, intervalB) {
    return (intervalA[1] < intervalB[0] || intervalB[1] < intervalA[0]);
}