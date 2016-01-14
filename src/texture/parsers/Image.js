import Frame from 'texture/Frame.js';

//  source = image reference

export default function Image (source) {

    return Frame(source.name, source, 0, 0, source.width, sourcee.height);

}
