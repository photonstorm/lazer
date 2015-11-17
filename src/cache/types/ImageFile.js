import CacheFile from 'cache/types/CacheFile.js';

export default class ImageFile extends CacheFile {

    constructor (key, url, data) {

        super(key, url, data);

        this.baseTexture = '';

    }

}
