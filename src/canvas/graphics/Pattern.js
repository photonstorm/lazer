
export default function Pattern (source, context, wrapX = true, wrapY = true) {

    let type = 'no-repeat';

    if (wrapX && wrapY)
    {
        type = 'repeat';
    }
    else if (wrapX)
    {
        type = 'repeat-x';
    }
    else if (wrapY)
    {
        type = 'repeat-y';
    }

    return context.createPattern(source, type);
    
}
