import ImageFile from './ImageFile.js';
import JSONFile from './JSONFile.js';
import MultiFile from '../MultiFile.js';

export default function AtlasXMLFile (key, textureURL, atlasURL, atlasData) {

    if (atlasURL === '' && atlasData === null)
    {
        atlasURL = key + '.xml';
    }

    return MultiFile(
        ImageFile(key, textureURL),
        XMLFile(key, atlasURL, atlasData)
    );

}
