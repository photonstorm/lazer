export default function ColorDodge (useNew) {

    return {
        type: 7,
        mode: (useNew) ? 'color-dodge' : 'source-over'
    }

}
