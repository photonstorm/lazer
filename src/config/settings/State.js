import BaseState from './State.js';

export default function State (settings) {

    return {
        name: 'state',
        value: BaseState(settings)
    };

}