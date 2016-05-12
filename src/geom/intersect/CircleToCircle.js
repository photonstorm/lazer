import DistanceBetween from '../../math/distance/DistanceBetween.js';

export default function CircleToCircle (a, b) {

    return (DistanceBetween(a.x, a.y, b.x, b.y) <= (a.radius + b.radius));

}