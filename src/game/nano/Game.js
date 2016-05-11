import Config from '../../config/Config.js';
import Dimensions from '../../config/settings/Dimensions.js';
import Parent from '../../config/settings/Parent.js';
import FrameRate from '../../config/settings/FrameRate.js';
import State from '../../config/settings/State.js';
import Boot from '../../dom/Boot.js';
import Banner from '../../utils/Banner.js';
import MainLoop from '../../system/MainLoop.js';
import Canvas from '../../canvas/Canvas.js';
import GetContext from '../../canvas/GetContext.js';
import AddToDOM from '../../dom/AddToDOM.js';
import Clear from '../../canvas/graphics/Clear.js';
import Loader from '../../loader/Loader.js';
import ResetTransform from '../../canvas/ResetTransform.js';

export default class Game {

    constructor (config = Config()) {

        this.config = config;

        this.config.require(
            Dimensions(),
            Parent(),
            FrameRate(),
            State()
        );

        this.canvas = null;
        this.context = null;
        this.load = null;

        Boot().then(() => this.init());

    }

    init () {

        Banner(this.config.get('gameTitle').name, this.config.get('gameTitle').url);

        let size = this.config.get('dimensions');

        this.canvas = Canvas(size.width, size.height);
        this.context = GetContext(this.canvas);

        AddToDOM(this.canvas, this.config.get('parent'));

        this.state = this.config.get('state');

        this.load = new Loader();

        //  Link systems to the State
        this.state.canvas = this.canvas;
        this.state.context = this.context;
        this.state.load = this.load;

        //  Populate the Loader
        this.state.init();
        this.state.preload();

        this.load.start().then(files => this.start(files));

    }

    start (files) {

        //  Add to cache?
        this.state.create();

        this.loop = new MainLoop(this.config.get('frameRate'));

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.render(t));

        this.loop.start();

    }

    begin () {

        ResetTransform(this.context);

        Clear(this.context, false);

    }

    update (delta) {

        this.state.update(delta);

    }

    render (t) {

        this.state.preRender();

        this.state.render(t);

        this.state.postRender();

    }

}
