import * as Fuzzy from 'math/Fuzzy.js';
import * as SnapTo from 'math/SnapTo.js';
import * as Angle from 'math/Angle.js';
import roundTo from 'math/RoundTo.js';
import floorTo from 'math/FloorTo.js';
import ceilTo from 'math/CeilTo.js';

export default class Math {

    constructor () {

        this.fuzzy = Fuzzy;
        this.snap = SnapTo;
        this.roundTo = roundTo;
        this.floorTo = floorTo;
        this.ceilTo = ceilTo;
        this.angle = Angle;

    }

}
