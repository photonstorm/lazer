//  The States themselves are responsible for adding local helpers (like load, add, etc)
//  Different State types can have different helpers
//  This class just deals with iterating them

        // shutdown,
        // destroy,


export default class StateManager {

    constructor () {

        //  Arrays because we're going to use priority ordering
        this.states = {
            init: [],
            preload: [],
            create: [],
            update: [],
            preRender: [],
            render: [],
            postRender: []
        };

    }

    add () {

    }

    remove () {

    }

    flush () {

    }

    switch () {

    }

    start () {

    }

    pause () {

    }

    resume () {

    }

    reload () {

    }

    stop () {

    }

    shutdown () {

    }

    destroy () {

    }
    
}