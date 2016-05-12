import Line from './Line.js';

export default function Clone (source) {

    return Line(source.x1, source.y1, source.x2, source.y2);
    
}