export default function Lighten (useNew) {

    return {
        type: 6,
        mode: (useNew) ? 'lighten' : 'source-over'
    }

}
