export default class BaseState {

    constructor (manager) {

        this.manager = manager;



    }

    //  Instead of all these functions how about you can create state types?
    //  A Loading State, a Paused State?
    //  In fact if you can activate new states easily then you wouldn't need 'pauseUpdate' etc.

    init () {

    }

    preload () {

    }

    loadUpdate () {

    }

    loadRender () {

    }

    create () {

    }

    update () {

    }

    preRender () {

    }

    postRender () {

    }

    hibernate () {

    }

    paused () {

    }

    resumed () {

    }

    shutdown () {

    }

    destroy () {

    }
    
}