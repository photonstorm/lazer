export default function Color (gl) {

    return {
        type: 15,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
