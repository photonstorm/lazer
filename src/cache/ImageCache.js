import BaseCache from './BaseCache';
import ImageFile from './types/ImageFile';

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
