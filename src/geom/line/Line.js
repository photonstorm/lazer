//  A Line Segment (a defined starting and end point)

export default function Line (x1 = 0, y1 = 0, x2 = 0, y2 = 0) {

    return {

        x1,
        y1,
        x2,
        y2,

        set: function (x1, y1, x2, y2) {

            this.x1 = x1;
            this.y1 = y1;

            this.x2 = x2;
            this.y2 = y2;

            return this;

        },

        get left () {

            return Math.min(this.x1, this.x2);

        },

        get right () {

            return Math.max(this.x1, this.x2);

        },

        get top () {

            return Math.min(this.y1, this.y2);

        },

        get bottom () {

            return Math.max(this.y1, this.y2);

        },

        toString: function () {

            return `[Line (x1=${this.x1}, y1=${this.y1}, x2=${this.x2}, y2=${this.y2})]`;

        }

    };

}