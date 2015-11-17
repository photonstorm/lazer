import BaseCache from 'cache/BaseCache.js';
import ImageCache from 'cache/ImageCache.js';

//  This is a 'single cache' that contains multiple cache types (image, audio, etc)
//  Each State will have its own cache, as well as there being a global game-wide cache.
//  Loader files should be able to be cache directed too.

export default class Cache {

    constructor () {

        this.images = new ImageCache();

    }

}