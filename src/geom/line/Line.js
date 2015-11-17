import Vec2 from 'math/vector/Vec2.js';

export default class Line {

    constructor (x1, y1, x2, y2) {

        this.points = [ new Vec2(), new Vec2(), new Vec2(), new Vec2() ];

        this.setTo(x1, y1, x2, y2);

    }
    
    setTo (x1, y1, x2, y2) {

        //  start
        this.points[0].setTo(x1, y1);

        //  end
        this.points[1].setTo(x2, y2);

        //  midPoint
        this.points[2].setTo(x1 + x2 / 2, y1 + y2 / 2);

        //  length
        this.points[3].setTo(x2 - x1, y2 - y1);

    }

    get x () {
        return Math.min(this.start.x, this.end.x);
    }

    get y () {
        return Math.min(this.start.y, this.end.y);
    }

    get left () {
        return Math.min(this.start.x, this.end.x);
    }

    get right () {
        return Math.max(this.start.x, this.end.x);
    }

    get top () {
        return Math.min(this.start.y, this.end.y);
    }

    get bottom () {
        return Math.max(this.start.y, this.end.y);
    }

    get width () {
        return Math.abs(this.start.x - this.end.x);
    }

    get height () {
        return Math.abs(this.start.y - this.end.y);
    }

    get start () {
        return this.points[0];
    }

    get end () {
        return this.points[1];
    }

    //  readonly
    get midPoint () {
        return this.points[2];
    }

    get length () {

        return Math.sqrt(this.points[3].x * this.points[3].x + this.points[3].y * this.points[3].y);

    }

    get angle () {

        return Math.atan2(this.points[3].x, this.points[3].y);

    }

    get slope () {

        return this.points[3].y / this.points[3].x;

    }

    get perpSlope () {

        return -(this.points[3].y / this.points[3].x);

    }

    get normalX () {

        return Math.cos(this.angle - 1.5707963267948966);

    }

    get normalY () {

        return Math.sin(this.angle - 1.5707963267948966);

    }

    clone () {
        return new Line(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    copyFrom (line) {
        this.setTo(line.start.x, line.start.y, line.end.x, line.end.y);
    }

    copyTo (line) {
        line.setTo(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    equals (line) {

        return (this.start.equals(line.start) && this.end.equals(line.end));

    }

    toString () {

        return `[Line (start.x=${this.start.x}, start.y=${this.start.y}, end.x=${this.end.x}, end.y=${this.end.y})]`;

    }
    
}