//  Config Loader

let data = {};

export default function Config (...settings) {

    let config = {

        add: function (setting) {

            data[setting.name] = (setting.hasOwnProperty('value')) ? setting.value : setting.properties;

        },

        remove: function (name) {

            delete data[name];

        },

        require: function (...settings) {

            for (let setting of settings)
            {
                if (!data.hasOwnProperty(setting.name))
                {
                    config.add(setting);
                }
            }

        },

        get: function (key) {

            if (key && data.hasOwnProperty(key))
            {
                return data[key];
            }
            else
            {
                return data;
            }

        }

    };

    for (let setting of settings)
    {
        config.add(setting);
    }

    return config;

}