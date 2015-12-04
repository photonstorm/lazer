//  Loop through all keys and update their details based on this event

//  Keys could be stored in a sorted array, sorted by charCode, so Process can bail out early?
//  But really how many Key objects are there ever likely to be? Even in a really mental game
//  it's still likely to only be a few.

export const list = new Set();

export function down (event) {

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
            //  repeat rate
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

        // console.log('down', key.char);
    }

    if (prevent)
    {
        event.preventDefault();
    }

}

export function up (event) {

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

        key.isDown = false;
        key.isUp = true;
        key.timeUp = event.timeStamp;
        key.duration = key.timeUp - key.timeDown;
        key._justDown = false;
        key._justUp = true;

        // console.log('up', key);
    }

    if (prevent)
    {
        event.preventDefault();
    }

}
