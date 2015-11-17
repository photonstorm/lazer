import OS from 'device/OS.js';
import Endian from 'device/Endian.js';

export default class Device {

    constructor () {

        this.os = new OS();
        this.LITTLE_ENDIAN = Endian();

    }

}