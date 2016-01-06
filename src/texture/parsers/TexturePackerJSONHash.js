import Frame from 'texture/Frame.js';
import SetTrim from 'texture/SetTrim.js';

//  source = image / canvas reference
//  json = Texture Packer JSON data

export default function TexturePackerJSONHash (source, json, output = []) {

    if (!json['frames'])
    {
        console.warn('Invalid JSON');
        return output;
    }
        
    for (let name in json.frames)
    {
        let data = json.frames[name];
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
