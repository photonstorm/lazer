export default function Screen (useNew) {

    return {
        type: 3,
        mode: (useNew) ? 'screen' : 'source-over'
    }

}
