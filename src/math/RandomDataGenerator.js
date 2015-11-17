export default class RandomDataGenerator {

    constructor (seeds = []) {

        this.c = 1;
        this.s0 = 0;
        this.s1 = 0;
        this.s2 = 0;

        if (typeof seeds === 'string')
        {
            this.state(seeds);
        }
        else
        {
            this.sow(seeds);
        }

    }

    get rnd () {

        let t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32

        this.c = t | 0;
        this.s0 = this.s1;
        this.s1 = this.s2;
        this.s2 = t - this.c;

        return this.s2;

    }

    sow (seeds) {

        // Always reset to default seed
        this.s0 = this.hash(' ');
        this.s1 = this.hash(this.s0);
        this.s2 = this.hash(this.s1);
        this.c = 1;

        if (!seeds)
        {
            return;
        }

        // Apply any seeds
        for (let i = 0; i < seeds.length && (seeds[i] != null); i++)
        {
            let seed = seeds[i];

            this.s0 -= this.hash(seed);
            this.s0 += ~~(this.s0 < 0);
            this.s1 -= this.hash(seed);
            this.s1 += ~~(this.s1 < 0);
            this.s2 -= this.hash(seed);
            this.s2 += ~~(this.s2 < 0);
        }

    }

    hash (data) {

        var h;
        var n = 0xefc8249d;

        data = data.toString();

        for (let i = 0; i < data.length; i++)
        {
            n += data.charCodeAt(i);
            h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000;// 2^32
        }

        return (n >>> 0) * 2.3283064365386963e-10;// 2^-32

    }

    get integer () {

        // 2^32
        return this.rnd * 0x100000000;

    }

    get frac () {

        // 2^-53
        return this.rnd + (this.rnd * 0x200000 | 0) * 1.1102230246251565e-16;

    }

    get real () {

        return this.integer + this.frac;

    }

    integerInRange (min, max) {

        return Math.floor(this.realInRange(0, max - min + 1) + min);

    }

    between (min, max) {

        return Math.floor(this.realInRange(0, max - min + 1) + min);

    }

    realInRange (min, max) {

        return this.frac * (max - min) + min;

    }

    get normal () {

        return 1 - 2 * this.frac;

    }

    get uuid () {

        var a = '';
        var b = '';

        for (b = a = ''; a++ < 36; b +=~a % 5 | a * 3&4 ? (a^15 ? 8^this.frac * (a^20 ? 16 : 4) : 4).toString(16) : '-')
        {
        }

        return b;

    }

    pick (array) {

        return array[this.between(0, array.length - 1)];

    }

    weightedPick (array) {

        return array[~~(Math.pow(this.frac, 2) * (array.length - 1) + 0.5)];

    }

    timestamp (min = 946684800000, max = 1577862000000) {

        return this.realInRange(min, max);

    }

    get angle () {

        return this.between(-180, 180);

    }

    state (state) {

        if (typeof state === 'string' && state.match(/^!rnd/))
        {
            state = state.split(',');

            this.c = parseFloat(state[1]);
            this.s0 = parseFloat(state[2]);
            this.s1 = parseFloat(state[3]);
            this.s2 = parseFloat(state[4]);
        }

        return ['!rnd', this.c, this.s0, this.s1, this.s2].join(',');

    }

}