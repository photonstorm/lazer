import Sub from 'math/vector/vec2/Sub.js'
import Length from 'math/vector/vec2/Length.js'

export default function (point, circlePosition, circleRadius) {
    return (Length(Sub(point, circlePosition)) <= circleRadius)
}