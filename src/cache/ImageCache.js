import BaseCache from 'cache/BaseCache.js';
import ImageFile from 'cache/types/ImageFile.js';

export default class ImageCache extends BaseCache {

    constructor () {

        super();

    }

    add (key, url, data) {

        const entry = new ImageFile(key, url, data);

        //  Add BaseTexture here

        super.add(key, entry);

    }

}
