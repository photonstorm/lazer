export default function Exclusion (useNew) {

    return {
        type: 12,
        mode: (useNew) ? 'exclusion' : 'source-over'
    }

}
