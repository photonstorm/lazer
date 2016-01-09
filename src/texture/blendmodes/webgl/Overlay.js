export default function Overlay (gl) {

    return {
        type: 4,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
