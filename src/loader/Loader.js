import BaseLoader from 'loader/BaseLoader.js';

import ImageFile from 'loader/types/ImageFile.js';
import JSONFile from 'loader/types/JSONFile.js';
import XMLFile from 'loader/types/XMLFile.js';
import TextFile from 'loader/types/TextFile.js';
import GLSLFile from 'loader/types/GLSLFile.js';
import BinaryFile from 'loader/types/BinaryFile.js';
import AtlasJSONFile from 'loader/types/AtlasJSONFile.js';
import AtlasXMLFile from 'loader/types/AtlasXMLFile.js';

/**
 * TODO:
 *
 * + Allow a way to specify which Cache a file is added to when processed
 * 
 */
export default class Loader extends BaseLoader {

    constructor (game) {

        super(game);

    }

    image (key, url = '') {

        return new ImageFile(this, key, url).add();

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

        return new JSONFile(this, key, url).add();

    }

    text (key, url = '') {

        return new TextFile(this, key, url).add();

    }

    glsl (key, url = '') {

        return new GLSLFile(this, key, url).add();

    }

    shader (key, url = '') {

        return new GLSLFile(this, key, url).add();

    }

    xml (key, url = '') {

        return new XMLFile(this, key, url).add();

    }

    binary (key, url = '', callback = null) {

        return new BinaryFile(this, key, url, callback).add();

    }

    atlas (key, textureURL = '', atlasURL = '', atlasData = null) {

        return new AtlasJSONFile(this, key, textureURL, atlasURL, atlasData).add();

    }

    atlasXML (key, textureURL = '', atlasURL = '', atlasData = null) {

        return new AtlasXMLFile(this, key, textureURL, atlasURL, atlasData).add();

    }

}