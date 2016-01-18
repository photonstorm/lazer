
export default function Cache () {

    let files = new Map();

    return {

        add: function (key, data) {

            files.set(key, data);

        },

        has: function (key) {

            return files.has(key);

        },

        get: function (key) {

            return files.get(key);

        },

        remove: function (key) {

            files.delete(key);

        },

        total: function () {

            return files.size;

        },

        flush: function () {

            files.clear();

        }

    };

}