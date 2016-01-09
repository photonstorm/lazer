export default function ColorBurn (gl) {

    return {
        type: 8,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
