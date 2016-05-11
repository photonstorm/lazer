import BaseLoader from './BaseLoader.js';
import ImageFile from './types/ImageFile.js';
import JSONFile from './types/JSONFile.js';
import XMLFile from './types/XMLFile.js';
import TextFile from './types/TextFile.js';
import GLSLFile from './types/GLSLFile.js';
import BinaryFile from './types/BinaryFile.js';
import AtlasJSONFile from './types/AtlasJSONFile.js';
import AtlasXMLFile from './types/AtlasXMLFile.js';

//  This is our Phaser-like Loader class. You don't have to use it :)

export default class Loader extends BaseLoader {

    constructor () {

        super();

    }

    image (key, url = '') {

        return this.addFile(ImageFile(key, url));

    }
 
    images (keys, urls = null) {

        if (Array.isArray(urls))
        {
            for (let i = 0; i < keys.length; i++)
            {
                this.image(keys[i], urls[i]);
            }
        }
        else
        {
            for (let i = 0; i < keys.length; i++)
            {
                this.image(keys[i]);
            }
        }

        return this;

    }

    json (key, url = '') {

        return this.addFile(JSONFile(key, url));

    }

    text (key, url = '') {

        return this.addFile(TextFile(key, url));

    }

    glsl (key, url = '') {

        return this.addFile(GLSLFile(key, url));

    }

    shader (key, url = '') {

        return this.addFile(GLSLFile(key, url));

    }

    xml (key, url = '') {

        return this.addFile(XMLFile(key, url));

    }

    binary (key, url = '', callback = undefined) {

        let file = BinaryFile(key, url);

        file.processCallback = callback;

        return this.addFile(file);

    }

    atlas (key, textureURL = '', atlasURL = '', atlasData = undefined) {

        return this.addFile(AtlasJSONFile(key, textureURL, atlasURL, atlasData));

    }

    atlasXML (key, textureURL = '', atlasURL = '', atlasData = undefined) {

        return this.addFile(AtlasXMLFile(key, textureURL, atlasURL, atlasData));

    }

}