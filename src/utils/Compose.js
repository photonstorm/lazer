//  Component fabrication.
//  Based on the Unity style of object creation.
//  Based on https://github.com/davedx/fabricant by Dave Clayton

export default function Compose (prefab) {

    const host = Object.create(prefab);

    host.components = new Map();

    for (let component of prefab.components)
    {
        let instance;

        if (component.prototype && component.prototype.constructor)
        {
            instance = new component();
        }
        else
        {
            instance = Object.create(component);
        }

        instance.host = host;

        host.components.set(component, instance);
    }

    return host;

}
