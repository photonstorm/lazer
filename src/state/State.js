import NOOP from '../system/NOOP.js';

export const PENDING = 0;
export const ACTIVE = 1;
export const PAUSED = 2;
export const DESTROYED = 3;

export default function State (
        {
            name = '',
            status = PENDING,
            init = NOOP,
            preload = NOOP,
            create = NOOP,
            update = NOOP,
            preRender = NOOP,
            render = NOOP,
            postRender = NOOP,
            shutdown = NOOP,
            destroy = NOOP
        } = {}
    ) {

    return {

        name,
        status,
        init,
        preload,
        create,
        update,
        preRender,
        render,
        postRender,
        shutdown,
        destroy,

        pause: function () {

            status = PAUSED;

        },

        resume: function () {

            status = ACTIVE;

        }

    };
    
}