export default function Overlay (useNew) {

    return {
        type: 4,
        mode: (useNew) ? 'overlay' : 'source-over'
    }

}
