export default function ColorBurn (useNew) {

    return {
        type: 8,
        mode: (useNew) ? 'color-burn' : 'source-over'
    }

}
