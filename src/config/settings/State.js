import BaseState from 'state/State.js';

export default function State (settings) {

    return {
        name: 'state',
        value: BaseState(settings)
    };

}