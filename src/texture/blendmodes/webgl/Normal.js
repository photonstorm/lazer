export default function Normal (gl) {

    return {
        type: 0,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
