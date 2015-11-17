
export default class Browser {

    constructor (device) {

        this.device = device;

        /**
        * @property {boolean} cocoonJS - Is the game running under CocoonJS?
        * @default
        */
        this.cocoonJS = false;
        
        /**
        * @property {boolean} cocoonJSApp - Is this game running with CocoonJS.App?
        * @default
        */
        this.cocoonJSApp = false;
        
        /**
        * @property {boolean} cordova - Is the game running under Apache Cordova?
        * @default
        */
        this.cordova = false;
        
        /**
        * @property {boolean} node - Is the game running under Node.js?
        * @default
        */
        this.node = false;
        
        /**
        * @property {boolean} nodeWebkit - Is the game running under Node-Webkit?
        * @default
        */
        this.nodeWebkit = false;
        
        /**
        * @property {boolean} electron - Is the game running under GitHub Electron?
        * @default
        */
        this.electron = false;
        
        /**
        * @property {boolean} ejecta - Is the game running under Ejecta?
        * @default
        */
        this.ejecta = false;

        /**
        * @property {boolean} crosswalk - Is the game running under the Intel Crosswalk XDK?
        * @default
        */
        this.crosswalk = false;

    }

    init (ua = navigator.userAgent) {

        if (/Arora/.test(ua))
        {
            this.arora = true;
        }
        else if (/Chrome\/(\d+)/.test(ua) && !this.device.os.windowsPhone)
        {
            this.chrome = true;
            this.chromeVersion = parseInt(RegExp.$1, 10);
        }
        else if (/Epiphany/.test(ua))
        {
            this.epiphany = true;
        }
        else if (/Firefox\D+(\d+)/.test(ua))
        {
            this.firefox = true;
            this.firefoxVersion = parseInt(RegExp.$1, 10);
        }
        else if (/AppleWebKit/.test(ua) && this.device.os.iOS)
        {
            this.mobileSafari = true;
        }
        else if (/MSIE (\d+\.\d+);/.test(ua))
        {
            this.ie = true;
            this.ieVersion = parseInt(RegExp.$1, 10);
        }
        else if (/Midori/.test(ua))
        {
            this.midori = true;
        }
        else if (/Opera/.test(ua))
        {
            this.opera = true;
        }
        else if (/Safari/.test(ua) && !this.device.os.windowsPhone)
        {
            this.safari = true;
        }
        else if (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(ua))
        {
            this.ie = true;
            this.trident = true;
            this.tridentVersion = parseInt(RegExp.$1, 10);
            this.ieVersion = parseInt(RegExp.$3, 10);
        }

        //  Silk gets its own if clause because its ua also contains 'Safari'
        if (/Silk/.test(ua))
        {
            this.silk = true;
        }

        //  WebApp mode in iOS
        if (navigator.standalone)
        {
            this.webApp = true;
        }
        
        if (window.cordova !== undefined)
        {
            this.cordova = true;
        }
        
        if (process !== undefined && require !== undefined)
        {
            this.node = true;
        }
        
        if (this.node && typeof process.versions === 'object')
        {
            this.nodeWebkit = !!process.versions['node-webkit'];
            
            this.electron = !!process.versions.electron;
        }
        
        if (navigator.isCocoonJS)
        {
            this.cocoonJS = true;

            try {
                this.cocoonJSApp = (typeof CocoonJS !== 'undefined');
            }
            catch (error)
            {
                this.cocoonJSApp = false;
            }
        }

        if (window.ejecta !== undefined)
        {
            this.ejecta = true;
        }

        if (/Crosswalk/.test(ua))
        {
            this.crosswalk = true;
        }

    }

}
