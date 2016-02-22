
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
    // x1: 241, y1: -393, x2: 20, y2: 502, x3: 38, y3: 245, x4: 7, y4: 150

    constructor (
        {
            x = 0,
            y = 0,
            qty = 400,
            xInc = 10,
            yInc = 5,
            width = 70,
            height = 40,
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

        this.forms = [];

        //  Private

        //  Modifiers

        this._x = x;
        this._y = y;

        this._x1 = 0; // x2
        this._y1 = 0; // y2

        this._x2 = 0; // x22
        this._y2 = 0; // y22

        this._x3 = 0; // x3
        this._y3 = 0; // y3

        this._x4 = 0; // x32
        this._y4 = 0; // y32

        this._px1 = 0;
        this._py1 = 0;
        this._px2 = 0;
        this._py2 = 0;

        this.dots = [];

        for (let i = 0; i < qty; i++)
        {
            this.dots.push({ i, x: 0, y: 0, dx: 0, dy: 0 });
        }

        this.addForm({ xInc, yInc, width, height, x1, y1, x2, y2, x3, y3, x4, y4 });

    }

    addForm (
        {
            xInc = 10,
            yInc = 5,
            width = 70,
            height = 40,
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

        this.currentForm = this.forms.push({ xInc, yInc, width, height, x1, y1, x2, y2, x3, y3, x4, y4 }) - 1;

    }

    loadData (
        {
            xInc = 10,
            yInc = 5,
            width = 70,
            height = 40,
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

        this._x = this.x;
        this._y = this.y;

        this._px1 = 0;
        this._py1 = 0;
        this._px2 = 0;
        this._py2 = 0;

        this.xInc = xInc;
        this.yInc = yInc;
        this.width = width;
        this.height = height;

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

        let f = this.forms[this.currentForm];

        let xi = f.xInc * 0.00001;
        let yi = f.yInc * 0.00001;

        this._x1 = f.x1 * xi;
        this._y1 = f.y1 * yi;

        this._x2 = f.x2 * xi;
        this._y2 = f.y2 * yi;

        this._x3 = f.x3 * xi;
        this._y3 = f.y3 * yi;

        this._x4 = f.x4 * xi;
        this._y4 = f.y4 * yi;
        
        this._px1 += this._x3;
        this._py1 += this._y3;
        this._px2 += this._x4;
        this._py2 += this._y4;

        for (let dot of this.dots)
        {
            dot.dx = dot.x;
            dot.dy = dot.y;

            dot.x = this._x + f.width * Math.sin(dot.i * this._x1 + this._px1) + f.width * Math.sin(dot.i * this._x2 + this._px2);
            dot.y = this._y - f.height * Math.sin(dot.i * this._y1 + this._py1) + f.height * Math.sin(dot.i * this._y2 + this._py2);
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

    get xInc () {
        return this.forms[this.currentForm].xInc;
    }

    set xInc (value) {
        this.forms[this.currentForm].xInc = value;
    }

    get yInc () {
        return this.forms[this.currentForm].yInc;
    }

    set yInc (value) {
        this.forms[this.currentForm].yInc = value;
    }

    get width () {
        return this.forms[this.currentForm].width;
    }

    set width (value) {
        this.forms[this.currentForm].width = value;
    }

    get height () {
        return this.forms[this.currentForm].height;
    }

    set height (value) {
        this.forms[this.currentForm].height = value;
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