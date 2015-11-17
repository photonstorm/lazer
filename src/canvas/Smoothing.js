export function set (context, value) {

    var s = this.getPrefix(context);

    if (s)
    {
        context[s] = value;
    }

    return context;

}

export function enable (context) {

    return this.set(context, true);

}

export function disable (context) {

    return this.set(context, false);

}

export function getPrefix (context) {

    var vendor = [ 'i', 'webkitI', 'msI', 'mozI', 'oI' ];

    for (var prefix in vendor)
    {
        var s = vendor[prefix] + 'mageSmoothingEnabled';

        if (s in context)
        {
            return s;
        }
    }

    return null;

}

export function isEnabled (context) {

    let s = this.getPrefix(context);

    if (s)
    {
        return context[s];
    }

}
