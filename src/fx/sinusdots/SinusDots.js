
export default class SinusDots {

    //  Waveforms by NewCore from the So Watt demo screen remake

    // x1: 1008, y1: 2048, x2: 512, y2: 970, x3: 248, y3: -436, x4: 372, y4: 64
    // x1: 7779, y1: -32703, x2: 0, y2: 0, x3: 232, y3: 274, x4: -204, y4: 130
    // x1: 7964, y1: 39680, x2: 21, y2: 64, x3: 169, y3: 292, x4: -119, y4: 356
    // x1: -309, y1: -16255, x2: 277, y2: 188, x3: 97, y3: 198, x4: -255, y4: 512
    // x1: -1093, y1: -1855, x2: 757, y2: 1014, x3: 846, y3: 572, x4: -274, y4: 408
    // x1: 864, y1: 2328, x2: 408, y2: 1014, x3: 421, y3: 1220, x4: 18, y4: 94
    // x1: -12, y1: 2952, x2: 737, y2: 1518, x3: -357, y3: -833, x4: 40, y4: 46
    // x1: 598, y1: 598, x2: 598, y2: 598, x3: 893, y3: 898, x4: 482, y4: 816
    // x1: 243, y1: 276, x2: 404, y2: 484, x3: 1259, y3: 1144, x4: 916, y4: 1268

    constructor (
        {
            x = 0,
            y = 0,
            qty = 400,
            xInc = 0.00010,
            yInc = 0.00005,
            x1 = 0,
            y1 = 0,
            x2 = 0,
            y2 = 0,
            x3 = 0,
            y3 = 0,
            x4 = 0,
            y4 = 0
        } = {})
    {

        this.currentForm = 0;

        this.x = x;
        this.y = y;

        this.xInc = xInc;
        this.yInc = yInc;

        //  Static

        this.sx1 = 79; // x1
        this.sy1 = 49; // y1

        this.sx2 = 79; // x12
        this.sy2 = 49; // y12

        //  Private

        //  Modifiers

        this._x1 = 0; // x2
        this._y1 = 0; // y2

        this._x2 = 0; // x22
        this._y2 = 0; // y22

        this._x3 = 0; // x3
        this._y3 = 0; // y3

        this._x4 = 0; // x32
        this._y4 = 0; // y32

        this.dots = [];

        for (let i = 0; i < qty; i++)
        {
            this.dots.push({ i, x: 0, y: 0, dx: 0, dy: 0 });
        }

        this._px = 0;
        this._py = 0;
        this._px2 = 0;
        this._py2 = 0;

        this.forms = [];

        this.addForm({ x1, y1, x2, y2, x3, y3, x4, y4 });

    }

    addForm (
        {
            x1 = 0,
            y1 = 0,
            x2 = 0,
            y2 = 0,
            x3 = 0,
            y3 = 0,
            x4 = 0,
            y4 = 0
        } = {})
    {

        this.currentForm = this.forms.push({ x1, y1, x2, y2, x3, y3, x4, y4 }) - 1;

    }

    loadData (
        {
            x1 = 0,
            y1 = 0,
            x2 = 0,
            y2 = 0,
            x3 = 0,
            y3 = 0,
            x4 = 0,
            y4 = 0
        } = {})
    {

        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.x4 = x4;
        this.y4 = y4;

    }

    update () {

        this._x1 = this.forms[this.currentForm].x1 * this.xInc;
        this._y1 = this.forms[this.currentForm].y1 * this.yInc;

        this._x2 = this.forms[this.currentForm].x2 * this.xInc;
        this._y2 = this.forms[this.currentForm].y2 * this.yInc;

        this._x3 = this.forms[this.currentForm].x3 * this.xInc;
        this._y3 = this.forms[this.currentForm].y3 * this.yInc;

        this._x4 = this.forms[this.currentForm].x4 * this.xInc;
        this._y4 = this.forms[this.currentForm].y4 * this.yInc;
        
        this._px += this._x3;
        this._py += this._y3;
        this._px2 += this._x4;
        this._py2 += this._y4;

        for (let dot of this.dots)
        {
            dot.dx = dot.x;
            dot.dy = dot.y;

            dot.x = this.x + this.sx1 * Math.sin(dot.i * this._x1 + this._px) + this.sx2 * Math.sin(dot.i * this._x2 + this._px2);
            dot.y = this.y - this.sy1 * Math.sin(dot.i * this._y1 + this._py) + this.sy2 * Math.sin(dot.i * this._y2 + this._py2);
        }

    }

    render (renderCallback) {

        for (let dot of this.dots)
        {
            renderCallback(dot);
        }

    }

    renderDot (t, ctx, size = 1) {

        for (let dot of this.dots)
        {
            let x = dot.dx + (dot.x - dot.dx) * t;
            let y = dot.dy + (dot.y - dot.dy) * t;
            
            ctx.fillRect(x, y, size, size);
        }

    }

    renderImage (t, ctx, image) {

        for (let dot of this.dots)
        {
            let x = dot.dx + (dot.x - dot.dx) * t;
            let y = dot.dy + (dot.y - dot.dy) * t;
            
            ctx.drawImage(image, x, y);
        }

    }

    get x1 () {
        return this.forms[this.currentForm].x1;
    }

    set x1 (value) {
        this.forms[this.currentForm].x1 = value;
    }

    get y1 () {
        return this.forms[this.currentForm].y1;
    }

    set y1 (value) {
        this.forms[this.currentForm].y1 = value;
    }

    get x2 () {
        return this.forms[this.currentForm].x2;
    }

    set x2 (value) {
        this.forms[this.currentForm].x2 = value;
    }

    get y2 () {
        return this.forms[this.currentForm].y2;
    }

    set y2 (value) {
        this.forms[this.currentForm].y2 = value;
    }

    get x3 () {
        return this.forms[this.currentForm].x3;
    }

    set x3 (value) {
        this.forms[this.currentForm].x3 = value;
    }

    get y3 () {
        return this.forms[this.currentForm].y3;
    }

    set y3 (value) {
        this.forms[this.currentForm].y3 = value;
    }

    get x4 () {
        return this.forms[this.currentForm].x4;
    }

    set x4 (value) {
        this.forms[this.currentForm].x4 = value;
    }

    get y4 () {
        return this.forms[this.currentForm].y4;
    }

    set y4 (value) {
        this.forms[this.currentForm].y4 = value;
    }

    destroy () {

        for (let dot of this.dots)
        {
            dot = undefined;
        }

        this.dots = [];
        this.forms = [];

    }

}