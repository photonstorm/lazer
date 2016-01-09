export default function SoftLight (useNew) {

    return {
        type: 10,
        mode: (useNew) ? 'soft-light' : 'source-over'
    }

}
