import * as Fuzzy from './Fuzzy.js';
import * as SnapTo from './SnapTo.js';
import * as Angle from './Angle.js';
import roundTo from './RoundTo.js';
import floorTo from './FloorTo.js';
import ceilTo from './CeilTo.js';

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
