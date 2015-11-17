import CacheFile from 'cache/types/CacheFile.js';

export default class BaseCache {

    constructor () {

        this.files = new Map();

    }

    add (key, data) {

        this.files.set(key, data);

    }

    has (key) {

        return this.files.has(key);

    }

    get (key) {

        return this.files.get(key);

    }

    remove (key) {

        this.files.delete(key);

    }

    destroy () {

        this.files.clear();

    }

}
