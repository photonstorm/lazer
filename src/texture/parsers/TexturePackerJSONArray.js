import Frame from 'texture/Frame.js';
import SetTrim from 'texture/SetTrim.js';

//  source = image / canvas reference
//  json = Texture Packer JSON data

export default function TexturePackerJSONArray (source, json, output = []) {

    if (!json['frames'])
    {
        console.warn('Invalid JSON');
        return output;
    }

    for (let i = 0; i < json.frames.length; i++)
    {
        let data = json.frames[i];
        let frame = Frame(data.filename, source, data.frame.x, data.frame.y, data.frame.w, data.frame.h);

        if (data.trimmed)
        {
            let trim = data.spriteSourceSize;

            SetTrim(frame, data.sourceSize.w, data.sourceSize.h, trim.x, trim.y, trim.w, trim.h);
        }

        output.push(frame);
    }

    return output;

}
