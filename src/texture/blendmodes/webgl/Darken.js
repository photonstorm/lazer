export default function Darken (gl) {

    return {
        type: 5,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
