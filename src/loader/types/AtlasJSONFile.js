import ImageFile from './ImageFile.js';
import JSONFile from './JSONFile.js';
import MultiFile from '../MultiFile.js';

export default function AtlasJSONFile (key, textureURL, atlasURL, atlasData) {

    if (atlasURL === '' && atlasData === null)
    {
        atlasURL = key + '.json';
    }

    return MultiFile(
        ImageFile(key, textureURL),
        JSONFile(key, atlasURL, atlasData)
    );

}
