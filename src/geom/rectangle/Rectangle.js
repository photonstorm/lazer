import Vec2 from 'math/Vec2.js';

export default class Rectangle {

    constructor (x = 0, y = 0, width = 0, height = 0) {

        this._width = 0;
        this._height = 0;

        this.points = [ new Vec2(), new Vec2(), new Vec2(), new Vec2() ];

        this.setTo(x, y, width, height);

    }

    setTo (x, y, width, height) {

        this._width = x + width;
        this._height = y + height;

        //  top-left      0, 0
        //  top-right     1, 0
        //  bottom-right  1, 1
        //  bottom-left   0, 1

        this.points[0].setTo(x, y);
        this.points[1].setTo(this._width, y);
        this.points[2].setTo(this._width, this._height);
        this.points[3].setTo(x, this._height);

    }

    get x () {
        return this.points[0].x;
    }

    get y () {
        return this.points[0].y;
    }

    get left () {
        return this.points[0].x;
    }

    get right () {
        return this.points[1].x;
    }

    get top () {
        return this.points[0].y;
    }

    get bottom () {
        return this.points[2].y;
    }

    get width () {
        return this._width;
    }

    get height () {
        return this._height;
    }

    get halfWidth () {
        return this._width / 2;
    }

    get halfHeight () {
        return this._height / 2;
    }

    get topLeft () {
        return this.points[0];
    }

    get topRight () {
        return this.points[1];
    }

    get bottomLeft () {
        return this.points[3];
    }

    get bottomRight () {
        return this.points[2];
    }

    get volume () {
        return this.width * this.height;
    }

    get perimeter () {
        return (this.width * 2) + (this.height * 2);
    }

    get randomX () {
        return this.x + (Math.random() * this.width);
    }

    get randomY () {
        return this.y + (Math.random() * this.height);
    }

    get empty () {
        return (this.width === 0 || this.height === 0)
    }

    set x (value) {

        if (value !== this.x)
        {
            this.setTo(value, this.y, this.width, this.height);
        }

    }

    set y (value) {

        if (value !== this.y)
        {
            this.setTo(this.x, value, this.width, this.height);
        }

    }

    set width (value) {

        if (value !== this.width)
        {
            this.setTo(this.x, this.y, value, this.height);
        }

    }

    set height (value) {

        if (value !== this.height)
        {
            this.setTo(this.x, this.y, this.width, value);
        }

    }

    set empty (value) {

        if (value)
        {
            this.setTo(0, 0, 0, 0);
        }

    }

    clone () {

        return new Rectangle(this.x, this.y, this.width, this.height);

    }

    copyFrom (rect) {

        this.setTo(rect.x, rect.y, rect.width, rect.height);

    }

    copyTo (rect) {

        rect.setTo(this.x, this.y, this.width, this.height);

    }

    scale (x, y) {

        this.setTo(this.x, this.y, this.width * x, this.height * y);

    }

    translate (x, y) {

        this.setTo(this.x + x, this.y + y, this.width, this.height);

    }

    centerOn (x, y) {

        this.setTo(x - (this.width / 2), y - (this.height / 2), this.width, this.height);

    }

    resize (width, height = this.height) {

        this.setTo(this.x, this.y, width, height);

    }

    equals (rect) {

        return (
            (this.x === rect.x) &&
            (this.y === rect.y) &&
            (this.width === rect.width) &&
            (this.height === rect.height)
        );

    }

    toString () {

        return `[Rectangle (x=${this.x}, y=${this.y}, width=${this.width}, height=${this.height})]`;

    }

}