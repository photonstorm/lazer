
export default class Features {

    constructor (device) {

        this.device = device;

        this.canvas = false;
        this.webGL = false;

        this.localStorage = false;

        this.file = false;
        this.fileSystem = false;

        this.worker = false;

        this.pointerLock = false;
        this.quirksMode = false;
        this.getUserMedia = false;

    }

    init () {

        this.canvas = !!window.CanvasRenderingContext2D || this.device.os.cocoonJS;

        try {
            this.localStorage = !!localStorage.getItem;
        }
        catch (error)
        {
            this.localStorage = false;
        }

        this.file = !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob;
        this.fileSystem = !!window.requestFileSystem;

        const checkWebGL = function () {
            try {
                var canvas = document.createElement('canvas');
                canvas.screencanvas = false;
                return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
            }
            catch (error)
            {
                return false;
            }
        }

        this.webGL = !!checkWebGL();

        this.worker = !!window.Worker;

        this.pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        this.quirksMode = (document.compatMode === 'CSS1Compat') ? false : true;

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        this.getUserMedia = !!navigator.getUserMedia && !!window.URL;

        // Older versions of firefox (< 21) apparently claim support but user media does not actually work
        // if (device.firefox && device.firefoxVersion < 21)
        // {
        //     device.getUserMedia = false;
        // }

        // TODO: replace canvasBitBltShift detection with actual feature check

        // Excludes iOS versions as they generally wrap UIWebView (eg. Safari WebKit) and it
        // is safer to not try and use the fast copy-over method.
        // if (!device.iOS && (device.ie || device.firefox || device.chrome))
        // {
        //     device.canvasBitBltShift = true;
        // }

        // Known not to work
        // if (device.safari || device.mobileSafari)
        // {
        //     device.canvasBitBltShift = false;
        // }

    }

}