import Frame from 'texture/Frame.js';
import FrameSet from 'texture/FrameSet.js';
import SetTrim from 'texture/SetTrim.js';

export default function ParseTextureAtlas (img, json) {

    if (!json['frames'])
    {
        console.warn('Invalid Atlas JSON');
        return;
    }

    const width = img.width;
    const height = img.height;
    const frames = new FrameSet();

        // var rect = json.frame;

        // var newFrame = this.addFrame(rect.x, rect.y, rect.w, rect.h, name);

        // if (json.trimmed)
        // {
        //     var source = json.spriteSourceSize;
        //     newFrame.setTrim(json.sourceSize.w, json.sourceSize.h, source.x, source.y, source.w, source.h);
        // }


    if (Array.isArray(json.frames))
    {
        for (let i = 0; i < json.frames.length; i++)
        {
            // let frame = Frame(i, );


            // frameData.add(json.frames[i], width, height, json.frames[i].filename);
        }
    }
    else
    {
        for (let name in json.frames)
        {
            // frameData.add(json.frames[name], width, height, name);
        }
    }

}

function AddFrame (frames, i, source) {

    let rect = source.frame;

    let frame = Frame(i);

}