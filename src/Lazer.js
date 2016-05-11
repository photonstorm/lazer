const Lazer = {

    /**
    * AUTO renderer - picks between WebGL or Canvas based on device.
    * @constant
    * @type {integer}
    */
    AUTO: 0,

    /**
    * Canvas Renderer.
    * @constant
    * @type {integer}
    */
    CANVAS: 1,

    /**
    * WebGL Renderer.
    * @constant
    * @type {integer}
    */
    WEBGL: 2,

    /**
    * Headless renderer (not visual output)
    * @constant
    * @type {integer}
    */
    HEADLESS: 3

};

export default Lazer;