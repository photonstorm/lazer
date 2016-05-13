import Sub from 'math/vector/vec2/Sub.js'
import Length from 'math/vector/vec2/Length.js'

export default function (circlePositionA, circleRadiusA, circlePositionB, circleRadiusB) {
    return (Length(Sub(circlePositionA, circlePositionB)) <= circleRadiusA + circleRadiusB)
}