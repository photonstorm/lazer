//  list = a Set full of Key objects

export default function ProcessKeyDown (event, list) {

    let prevent = false;

    for (let key of list)
    {
        if (key.keyCode !== event.keyCode || !key.enabled)
        {
            continue;
        }

        if (key.preventDefault)
        {
            prevent = true;
        }

        key.altKey = event.altKey;
        key.ctrlKey = event.ctrlKey;
        key.shiftKey = event.shiftKey;

        if (key.isDown)
        {
            key.repeats++;
        }
        else
        {
            key.isDown = true;
            key.isUp = false;
            key.timeDown = event.timeStamp;
            key.duration = 0;
            key.repeats = 0;
            key._justDown = true;
            key._justUp = false;
        }

        console.log('down', key.char);
    }

    if (prevent)
    {
        event.preventDefault();
    }

}
