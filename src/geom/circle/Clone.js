import Circle from 'geom/circle/Circle.js';

export default function Clone (source) {

    return Circle(source.x, source.y, source.radius);
    
}