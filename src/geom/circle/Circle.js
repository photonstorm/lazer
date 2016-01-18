
export default function Circle (x = 0, y = 0, radius = 0) {

    let _radius = radius;
    let _diameter = radius * 2;

    return {

        x,

        y,

        set: function (x, y = x, radius = _radius) {

            this.x = x;
            this.y = y;
            this.radius = radius;

        },

        get radius () {

            return _radius;

        },

        set radius (value) {

            _radius = value;
            _diameter = value * 2;

        },

        get diameter () {

            return _diameter;

        },

        set diameter (value) {

            _diameter = value;
            _radius = value * 0.5;

        },

        get left () {

            return this.x - _radius;

        },

        get right () {

            return this.x + _radius;

        },

        get top () {

            return this.y - _radius;

        },

        get bottom () {

            return this.y + _radius;

        },

        toString: function () {

            return `[Circle (x=${this.x}, y=${this.y}, radius=${this.radius})]`;

        }

    };
    
}