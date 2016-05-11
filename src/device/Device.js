import OS from './OS.js';
import Endian from './Endian.js';

export default class Device {

    constructor () {

        this.os = new OS();
        this.LITTLE_ENDIAN = Endian();

    }

}