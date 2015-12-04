//  list = a Set full of Key objects

export default function ProcessKeyUp (event, list) {

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

        console.log('up', key.char);
    }

    if (prevent)
    {
        event.preventDefault();
    }

}
