export default function ColorDodge (gl) {

    return {
        type: 7,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
