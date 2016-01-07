import ImageFile from 'loader/types/ImageFile.js';
import XMLFile from 'loader/types/XMLFile.js';
import MultiFile from 'loader/MultiFile.js';

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
