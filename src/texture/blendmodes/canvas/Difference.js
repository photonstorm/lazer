export default function Difference (useNew) {

    return {
        type: 11,
        mode: (useNew) ? 'difference' : 'source-over'
    }

}
