export default function Darken (useNew) {

    return {
        type: 5,
        mode: (useNew) ? 'darken' : 'source-over'
    }

}
