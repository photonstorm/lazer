import Frame from 'texture/Frame.js';

//  Generates an array full of Frame objects that correspond to the individual frames
//  of a classic sprite sheet - where each frame of the sheet is the exact same size.

//  source = image / canvas reference
//  name = a string based name to give the frames (i.e. if you pass 'player' each Frame will be called 'player0', 'player1', and so on)

export default function SpriteSheet (
        source,
        name,
        output = [],
        {
            frameWidth = 0,
            frameHeight = 0,
            frameMax = -1,
            margin = 0,
            spacing = 0
        } = {}
    ) {

    let width = source.width;
    let height = source.height;

    if (frameWidth <= 0)
    {
        frameWidth = Math.floor(-width / Math.min(-1, frameWidth));
    }

    if (frameHeight <= 0)
    {
        frameHeight = Math.floor(-height / Math.min(-1, frameHeight));
    }

    let row = Math.floor((width - margin) / (frameWidth + spacing));
    let column = Math.floor((height - margin) / (frameHeight + spacing));
    let total = row * column;

    if (frameMax !== -1)
    {
        total = frameMax;
    }

    //  Zero or smaller than frame sizes?
    if (width === 0 || height === 0 || width < frameWidth || height < frameHeight || total === 0)
    {
        return output;
    }

    let x = margin;
    let y = margin;

    for (let i = 0; i < total; i++)
    {
        let frame = Frame(name + i.toString(), source, x, y, frameWidth, frameHeight);

        x += frameWidth + spacing;

        if (x + frameWidth > width)
        {
            x = margin;
            y += frameHeight + spacing;
        }
    }

    return output;

}
