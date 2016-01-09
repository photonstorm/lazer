export default function Difference (gl) {

    return {
        type: 11,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
