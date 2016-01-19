
//  Encapsulates a 2D rectangle defined by its corner point in the top-left
//  and its extends in x (width) and y (height)

export default function Rectangle (x = 0, y = 0, width = 0, height = 0) {

    return {

        x,

        y,

        width,

        height,

        set: function (x, y, width, height) {

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

            return this;

        },

        setPosition: function (x, y = x) {

            this.x = x;
            this.y = y;

            return this;

        },

        setSize: function (width, height = width) {

            this.width = width;
            this.height = height;

            return this;

        },

        get left () {

            return this.x;

        },

        get right () {

            return this.x + this.width;

        },

        get top () {

            return this.y;

        },

        get bottom () {

            return this.y + this.height;

        },

        toString: function () {

            return `[Rectangle (x=${this.x}, y=${this.y}, width=${this.width}, height=${this.height})]`;

        }

    }

}