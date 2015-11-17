export default class RenderList {

    constructor () {

        this.list = new Set();

    }

    clear () {

        this.list.clear();

    }

    get length () {

        return this.list.size;

    }

    add (texture) {

        this.list.add(texture);

    }

}